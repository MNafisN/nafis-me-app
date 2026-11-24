// Slash commands and the Hermes AI agent client (no DOM manipulation; reads documentElement.lang for locale)
import { getProfile } from "../data/profile.js";

const AGENT_API_URL = import.meta.env.PUBLIC_AGENT_API_URL || "http://43.173.22.252:8080/api/chat";
const AGENT_MODEL = "hermes-agent";
const MAX_HISTORY_MESSAGES = 6;
const AGENT_TIMEOUT_MS = 25000;

const BASE_COMMANDS = [
    { name: "help", args: "" },
    { name: "projects", args: "" },
    { name: "project", args: "<name>" },
    { name: "cv", args: "" },
    { name: "contact", args: "" },
    { name: "clear", args: "" },
    { name: "maximize", args: "" },
];

function currentProfile() {
    const lang = typeof document !== "undefined" ? document.documentElement.lang : "id";
    return getProfile(lang);
}

function localizedCommands() {
    const { ui } = currentProfile();
    return BASE_COMMANDS.map((cmd) => ({
        ...cmd,
        description: ui.commandDescriptions[cmd.name] ?? "",
    }));
}

export const commands = localizedCommands();

function usage(command) {
    return command.args ? `/${command.name} ${command.args}` : `/${command.name}`;
}

function card(project) {
    const item = { title: project.title, desc: project.desc, tag: project.tag };
    if (project.href) item.href = project.href;
    return item;
}

function slugList(projects) {
    return projects.map((project) => project.slug).join(", ");
}

function help() {
    const { ui } = currentProfile();
    const list = localizedCommands();
    return [
        {
            type: "list",
            title: ui.commandsTitle,
            items: list.map((command) => ({ term: usage(command), desc: command.description })),
        },
        {
            type: "text",
            text: ui.helpFooter,
        },
    ];
}

function listProjects() {
    const { projects, ui } = currentProfile();
    return [
        { type: "text", text: ui.projectsIntro },
        { type: "cards", items: projects.map(card) },
    ];
}

function showProject(slug) {
    const { projects, ui } = currentProfile();
    if (!slug) {
        return [{
            type: "error",
            text: ui.missingProjectError(slugList(projects)),
        }];
    }

    const project = projects.find((p) => p.slug === slug);
    if (!project) {
        return [{
            type: "error",
            text: ui.unknownProjectError(slug, slugList(projects)),
        }];
    }

    const blocks = [{ type: "cards", items: [card(project)] }];
    if (project.details) blocks.push({ type: "text", text: project.details });
    return blocks;
}

function showCv() {
    const { cv, ui } = currentProfile();
    return [
        { type: "list", title: cv.role, items: cv.summary.map((line) => ({ term: "-", desc: line })) },
        { type: "links", items: [{ label: ui.downloadCv, href: cv.pdf }] },
    ];
}

export function isCommand(text) {
    return String(text).trim().startsWith("/");
}

export async function runCommand(text, ctx) {
    const { contact, ui } = currentProfile();
    const words = String(text).trim().slice(1).split(/\s+/).filter(Boolean);
    const name = (words[0] ?? "").toLowerCase();
    const arg = (words[1] ?? "").toLowerCase();

    switch (name) {
        case "help":
            return help();
        case "projects":
            return listProjects();
        case "project":
            return showProject(arg);
        case "cv":
            return showCv();
        case "contact":
            return [{ type: "links", items: contact.map(({ label, href }) => ({ label, href })) }];
        case "clear":
            ctx?.clear?.();
            return [];
        case "maximize":
            if (ctx?.maximize?.() === false) {
                return [{ type: "text", text: ui.maximizeWideOnly }];
            }
            return [];
        case "":
            return [{ type: "error", text: ui.emptyCommandError }];
        default:
            return [{ type: "error", text: ui.unknownCommandError(words[0]) }];
    }
}

export async function askAgent(input, history = []) {
    const { ui } = currentProfile();
    const isArrayInput = Array.isArray(input);
    const userText = isArrayInput ? "" : String(input).trim();
    const messages = isArrayInput
        ? input.slice(-MAX_HISTORY_MESSAGES)
        : [...history.slice(-(MAX_HISTORY_MESSAGES - 1)), { role: "user", content: userText }];

    try {
        const response = await fetch(AGENT_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: AGENT_MODEL,
                messages,
                stream: false,
            }),
            signal: AbortSignal.timeout(AGENT_TIMEOUT_MS),
        });

        if (response.status === 429) {
            return [{ type: "text", text: ui.agentRateLimitReply }];
        }

        if (!response.ok) {
            return [{ type: "text", text: ui.agentFallbackReply }];
        }

        const data = await response.json();
        const reply = data?.choices?.[0]?.message?.content?.trim();
        if (data?.hermes?.failed || !reply) {
            return [{ type: "text", text: ui.agentFallbackReply }];
        }

        if (!isArrayInput && Array.isArray(history)) {
            history.push({ role: "user", content: userText }, { role: "assistant", content: reply });
            if (history.length > MAX_HISTORY_MESSAGES) {
                history.splice(0, history.length - MAX_HISTORY_MESSAGES);
            }
        }

        return [{ type: "text", text: reply }];
    } catch {
        return [{ type: "text", text: ui.agentFallbackReply }];
    }
}

export function suggest(value) {
    const text = String(value).trimStart();
    if (!text.startsWith("/")) return [];

    const { projects } = currentProfile();
    const list = localizedCommands();

    // No space yet: complete the command name
    if (!/\s/.test(text)) {
        const prefix = text.slice(1).toLowerCase();
        // An exact name goes first, so "/project" offers /project before /projects
        return list
            .filter((command) => command.name.startsWith(prefix))
            .sort((a, b) => (b.name === prefix) - (a.name === prefix))
            .map((command) => ({
                value: `/${command.name}`,
                label: `/${command.name}`,
                hint: command.args,
                description: command.description,
                needsArg: command.args !== "",
            }));
    }

    // "/project " followed by at most one partial word: complete the slug
    const match = text.match(/^\/project\s+(\S*)$/i);
    if (!match) return [];

    const prefix = match[1].toLowerCase();
    return projects
        .filter((project) => project.slug.startsWith(prefix))
        .map((project) => ({
            value: `/project ${project.slug}`,
            label: project.slug,
            hint: "",
            description: project.title,
            needsArg: false,
        }));
}
