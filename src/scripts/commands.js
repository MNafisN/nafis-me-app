// Slash commands and the fake AI agent (no DOM code; returns reply blocks)
import { contact, cv, projects } from "../data/profile.js";

export const commands = [
    { name: "help", args: "", description: "List the commands" },
    { name: "projects", args: "", description: "List the projects" },
    { name: "project", args: "<name>", description: "Show one project" },
    { name: "cv", args: "", description: "Show the CV summary and PDF link" },
    { name: "contact", args: "", description: "Show the contact links" },
    { name: "clear", args: "", description: "Clear this tab" },
    { name: "maximize", args: "", description: "Maximize or restore the terminal (wide screens)" },
];

const HELP_HINT = "Type /help to see the commands.";

function usage(command) {
    return command.args ? `/${command.name} ${command.args}` : `/${command.name}`;
}

function card(project) {
    const item = { title: project.title, desc: project.desc, tag: project.tag };
    if (project.href) item.href = project.href;
    return item;
}

function slugList() {
    return projects.map((project) => project.slug).join(", ");
}

function help() {
    return [
        {
            type: "list",
            title: "Commands",
            items: commands.map((command) => ({ term: usage(command), desc: command.description })),
        },
        {
            type: "text",
            text: "Type anything else (without a leading /) to chat with the AI agent.\nPress ? to see the keyboard shortcuts.",
        },
    ];
}

function listProjects() {
    return [
        { type: "text", text: "Projects. Type /project <name> to see one in detail." },
        { type: "cards", items: projects.map(card) },
    ];
}

function showProject(slug) {
    if (!slug) {
        return [{
            type: "error",
            text: `Missing project name. Usage: /project <name>. Names: ${slugList()}. Type /projects to see them all, or /help for the commands.`,
        }];
    }

    const project = projects.find((p) => p.slug === slug);
    if (!project) {
        return [{
            type: "error",
            text: `Unknown project: ${slug}. Names: ${slugList()}. Type /projects to see them all, or /help for the commands.`,
        }];
    }

    const blocks = [{ type: "cards", items: [card(project)] }];
    if (project.details) blocks.push({ type: "text", text: project.details });
    return blocks;
}

function showCv() {
    return [
        { type: "list", title: cv.role, items: cv.summary.map((line) => ({ term: "-", desc: line })) },
        { type: "links", items: [{ label: "Download CV (PDF)", href: cv.pdf }] },
    ];
}

export function isCommand(text) {
    return String(text).trim().startsWith("/");
}

export async function runCommand(text, ctx) {
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
                return [{ type: "text", text: "Maximize is only available on wider screens." }];
            }
            return [];
        case "":
            return [{ type: "error", text: `Type a command name after /. ${HELP_HINT}` }];
        default:
            return [{ type: "error", text: `Unknown command: /${words[0]}. ${HELP_HINT}` }];
    }
}

export async function askAgent(text) {
    const delay = 600 + Math.random() * 300;
    await new Promise((resolve) => setTimeout(resolve, delay));
    return [{
        type: "text",
        text: "The AI agent is not connected yet (demo mode), so I can't answer that for now.\nTry /help to see what you can do here.",
    }];
}

export function suggest(value) {
    const text = String(value).trimStart();
    if (!text.startsWith("/")) return [];

    // No space yet: complete the command name
    if (!/\s/.test(text)) {
        const prefix = text.slice(1).toLowerCase();
        return commands
            .filter((command) => command.name.startsWith(prefix))
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
