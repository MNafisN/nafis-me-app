// Bilingual profile data (id as default, en as secondary) used by the page tabs and terminal slash commands.
// Privacy rule: never include street address, phone number, or birth date in this file.

export const profiles = {
    id: {
        ui: {
            banner: "Selamat datang di Terminal NafisApp. Pilih aksi cepat di bawah, atau ketik pesan.",
            commandsTitle: "Perintah",
            helpFooter: "Ketik teks biasa (tanpa awalan /) untuk mengobrol dengan AI agent.\nTekan ? untuk melihat pintasan keyboard.",
            projectsIntro: "Daftar proyek utama. Ketik /project <nama> untuk melihat detailnya.",
            downloadCv: "Unduh CV (PDF)",
            maximizeWideOnly: "Mode perbesar hanya tersedia di layar lebar.",
            emptyCommandError: "Ketik nama perintah setelah /. Ketik /help untuk melihat daftar perintah.",
            unknownCommandError: (cmd) => `Perintah tidak dikenal: /${cmd}. Ketik /help untuk melihat daftar perintah.`,
            missingProjectError: (slugs) => `Nama proyek belum diisi. Gunakan: /project <nama>. Pilihan: ${slugs}. Ketik /projects untuk melihat semuanya, atau /help untuk daftar perintah.`,
            unknownProjectError: (slug, slugs) => `Proyek tidak ditemukan: ${slug}. Pilihan: ${slugs}. Ketik /projects untuk melihat semuanya, atau /help untuk daftar perintah.`,
            agentDemoReply: "AI agent belum terhubung (mode demo), jadi belum bisa menjawab pesan ini.\nCoba ketik /help untuk melihat perintah yang tersedia.",
            commandDescriptions: {
                help: "Tampilkan daftar perintah",
                projects: "Tampilkan daftar proyek",
                project: "Tampilkan detail satu proyek",
                cv: "Tampilkan ringkasan CV dan tautan PDF",
                contact: "Tampilkan tautan kontak",
                clear: "Bersihkan layar terminal ini",
                maximize: "Perbesar atau kembalikan ukuran terminal (layar lebar)",
            },
        },
        home: {
            badge: "CTO @ GLOBISTEC · Backend & Cloud",
            name: "Mohammad Nafis Naufally",
            headline: "Software Engineer & Cloud Infrastructure Advisor yang membangun ekosistem aplikasi bisnis, arsitektur server Linux/Docker, dan otomasi AI.",
            intro: "Lulusan Informatika ITS Surabaya yang berfokus pada rekayasa backend dan pengembangan infrastruktur cloud. Saat ini memimpin tim teknis dan arsitektur sistem di PT. Global Bisnis Teknologi (GLOBISTEC) untuk koperasi digital, marketplace, sistem pembayaran PPOB, serta infrastruktur server produksi.",
            pillarsTitle: "Fokus Utama",
            pillars: [
                {
                    tag: "Backend & Arsitektur",
                    variant: "primary",
                    title: "Rekayasa Sistem & Koperasi Digital",
                    desc: "Memimpin pengembangan GoodLink (dipakai 8 koperasi digital), marketplace KiosOke, dan ekspedisi D'antar dengan Laravel & MariaDB. Memimpin refactoring ke Laravel 11 dengan struktur modular Domain-Driven Design (DDD), serta merancang sistem Payment Adapter dari dokumen SKPL hingga produksi dengan Filament dan Redis.",
                },
                {
                    tag: "Cloud & Infrastruktur",
                    variant: "secondary",
                    title: "Arsitektur Cloud & Server Produksi",
                    desc: "Mengelola server Ubuntu & Debian berbasis Docker di Tencent Cloud dan BiznetGio, termasuk penyusunan VPC, firewall, routing, snapshot, dan backup. Mendampingi klien sebagai konsultan pre-sales Tencent Cloud untuk penghitungan kapasitas server, serta tersertifikasi Alibaba Cloud ACP & ACA.",
                },
                {
                    tag: "AI & Otomasi DevOps",
                    variant: "primary",
                    title: "AI Agent Otonom & Alur Kerja Tim",
                    desc: "Membangun AI agent dari nol dengan Python dan shell script di Debian yang dapat mengelola server secara mandiri via Slack, Telegram, Discord, dan API. Mengelola 14 repositori GitHub Organization (branch rules & CI/CD), otomasi tugas dengan n8n, serta memantau kesehatan model di PusatTokenAI dengan LiteLLM.",
                },
            ],
            contactTitle: "Kontak & Tautan",
            terminalCtaTitle: "Ingin eksplorasi lewat baris perintah?",
            terminalCtaText: "Buka tab Terminal untuk menjalankan perintah seperti /projects, /project goodlink-ecosystem, atau /cv.",
            terminalCtaButton: "Buka Terminal",
        },
        projects: [
            {
                slug: "goodlink-ecosystem",
                title: "GoodLink, KiosOke & D'antar",
                desc: "Ekosistem koperasi digital (8 koperasi aktif), marketplace, dan layanan pengantaran berbasis Laravel 11 DDD & MariaDB.",
                tag: "Laravel 11",
                details: "Memimpin pengembangan GoodLink Host & Client (aplikasi koperasi digital yang saat ini digunakan oleh 8 koperasi di Jawa Timur), KiosOke (marketplace), dan D'antar (pengantaran).\nMemimpin refactoring GoodLink Client ke Laravel 11 dengan arsitektur modular Domain-Driven Design (DDD), dilengkapi pengujian feature test Laravel dan pengujian API Postman.",
            },
            {
                slug: "payment-adapter",
                title: "Payment Adapter & PPOB Bridge",
                desc: "Jembatan transaksi antara GoodLink dengan agregator PPOB MME dan TokoAtlas menggunakan Laravel, Filament, Redis, dan MariaDB.",
                tag: "Payment",
                details: "Merancang sistem Payment Adapter dari awal mulai dari dokumen spesifikasi SKPL hingga manajemen proyek dengan SDLC dan Agile.\nDibangun menggunakan Laravel, Filament, Redis, dan MariaDB untuk menghubungkan GoodLink Client dengan agregator biller PPOB MME (.NET via VNC) dan TokoAtlas, termasuk integrasi aplikasi Android whitelabel KHOINS.",
            },
            {
                slug: "ai-agent-ops",
                title: "GLOBISTEC Autonomous Server AI Agent",
                desc: "AI agent pengelolaan server Debian yang dibangun dari nol dengan Python & shell script, terhubung ke Slack, Telegram, Discord, dan API.",
                tag: "Python AI",
                details: "Membangun AI agent otonom dari nol menggunakan Python dan shell script di atas server Debian yang dibekali basis pengetahuan internal GLOBISTEC.\nAgent ini mampu memeriksa dan mengelola server secara mandiri melalui Slack, Telegram, Discord, maupun pemanggilan HTTP API, berdampingan dengan pemeliharaan platform orkestrasi agen Kolegaku berbasis Odoo.",
            },
            {
                slug: "pusattoken-ai",
                title: "PusatTokenAI & Model Health Monitor",
                desc: "Layanan gateway API berbagai model AI kompatibel OpenAI beserta pemantauan kesehatan endpoint menggunakan LiteLLM.",
                tag: "LiteLLM",
                details: "Menjaga ketersediaan endpoint dan memasarkan PusatTokenAI, layanan akses beragam model AI melalui satu endpoint yang kompatibel dengan OpenAI (berbayar per panggilan API).\nMengonfigurasi sistem pemantauan kesehatan model menggunakan LiteLLM untuk menguji ketersediaan seluruh model yang terdaftar secara berkala.",
            },
            {
                slug: "cloud-devops",
                title: "Multi-Cloud Docker & 14-Repo DevOps",
                desc: "Infrastruktur Docker di Tencent Cloud & BiznetGio, CI/CD 14 repositori GitHub, serta otomasi pemantauan tugas dengan n8n.",
                tag: "Cloud / DevOps",
                details: "Mengelola server Ubuntu dan Debian yang menjalankan aplikasi Docker (GoodLink, GoodLink Host, GoodWater) di Tencent Cloud dan BiznetGio, termasuk perancangan VPC, firewall, routing, snapshot, backup, dan DNS Cloudflare (GoodMedis).\nMengatur 14 repositori GitHub Organization dengan aturan branch dan CI/CD otomatis, logging aplikasi ke Discord/Slack, serta otomasi pemantauan tugas ClickUp dengan n8n dan JavaScript.",
            },
            {
                slug: "nafis-me-app",
                title: "Terminal Portfolio (nafis-me-app)",
                desc: "Situs personal bergaya terminal Claude Code dengan tema terang, tab interaktif, dan dukungan multibahasa.",
                tag: "Astro",
                href: "https://github.com/MNafisN/nafis-me-app",
                details: "Situs personal yang dibangun dengan Astro dan CSS murni tanpa framework eksternal.\nMenggabungkan antarmuka terminal interaktif (perintah slash, pelengkapan otomatis, dan riwayat pesan) dengan tampilan halaman terpusat dalam bahasa Indonesia dan Inggris.",
            },
        ],
        cv: {
            role: "CTO di PT. Global Bisnis Teknologi (GLOBISTEC) · B.Comp.Sc. ITS Surabaya",
            summary: [
                "CTO di PT. Global Bisnis Teknologi (Okt 2023 – Sekarang): memimpin rekayasa backend (Laravel 11 DDD, MariaDB, Redis), perancangan Payment Adapter, operasional 14 repositori GitHub CI/CD, dan AI agent server.",
                "Cloud & Infrastruktur: mengelola arsitektur Tencent Cloud (VPC, firewall, snapshot, backup), server Docker Ubuntu/Debian di BiznetGio, Cloudflare, serta tersertifikasi Alibaba Cloud ACP & ACA (2024).",
                "Pendidikan & Pengalaman Awal: Sarjana Ilmu Komputer (Informatika) ITS Surabaya (IPK 3.34/4.00); sebelumnya Admin IT Pemerintah Daerah Banjartanggul (sinkronisasi 1.030+ data tanah BPN) dan Intern di PT. PJB (PLN Group).",
            ],
            pdf: "/files/cv.pdf",
        },
        contact: [
            { label: "GitHub (MNafisN)", href: "https://github.com/MNafisN" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/MNafisN/" },
            { label: "Email (nafisnoval7165@gmail.com)", href: "mailto:nafisnoval7165@gmail.com" },
        ],
    },
    en: {
        ui: {
            banner: "Welcome to NafisApp Terminal. Pick a quick action below, or type a message.",
            commandsTitle: "Commands",
            helpFooter: "Type anything else (without a leading /) to chat with the AI agent.\nPress ? to see the keyboard shortcuts.",
            projectsIntro: "Projects. Type /project <name> to see one in detail.",
            downloadCv: "Download CV (PDF)",
            maximizeWideOnly: "Maximize is only available on wider screens.",
            emptyCommandError: "Type a command name after /. Type /help to see the commands.",
            unknownCommandError: (cmd) => `Unknown command: /${cmd}. Type /help to see the commands.`,
            missingProjectError: (slugs) => `Missing project name. Usage: /project <name>. Names: ${slugs}. Type /projects to see them all, or /help for the commands.`,
            unknownProjectError: (slug, slugs) => `Unknown project: ${slug}. Names: ${slugs}. Type /projects to see them all, or /help for the commands.`,
            agentDemoReply: "The AI agent is not connected yet (demo mode), so I can't answer that for now.\nTry /help to see what you can do here.",
            commandDescriptions: {
                help: "List the commands",
                projects: "List the projects",
                project: "Show one project",
                cv: "Show the CV summary and PDF link",
                contact: "Show the contact links",
                clear: "Clear this tab",
                maximize: "Maximize or restore the terminal (wide screens)",
            },
        },
        home: {
            badge: "CTO @ GLOBISTEC · Backend & Cloud",
            name: "Mohammad Nafis Naufally",
            headline: "Software Engineer & Cloud Infrastructure Advisor building digital business ecosystems, Linux/Docker cloud architecture, and AI automation.",
            intro: "Computer Science graduate from ITS Surabaya focused on backend engineering and cloud infrastructure. Currently leading engineering and system architecture at PT. Global Bisnis Teknologi (GLOBISTEC) across digital cooperatives, marketplaces, PPOB payment bridges, and production Linux servers.",
            pillarsTitle: "What I Do",
            pillars: [
                {
                    tag: "Backend & Systems",
                    variant: "primary",
                    title: "Core Platforms & Digital Cooperatives",
                    desc: "Leading development of GoodLink (powering 8 digital cooperatives), the KiosOke marketplace, and D'antar delivery platform with Laravel & MariaDB. Led the modular Domain-Driven Design (DDD) refactoring to Laravel 11 and architected the Payment Adapter from formal SKPL specs to production using Filament and Redis.",
                },
                {
                    tag: "Cloud & Infrastructure",
                    variant: "secondary",
                    title: "Cloud Architecture & Production Servers",
                    desc: "Operating containerized Docker workloads on Ubuntu & Debian across Tencent Cloud and BiznetGio—designing VPC topology, firewalls, routing rules, snapshots, and backups. Advising clients on server sizing as a Tencent Cloud pre-sales engineer, backed by Alibaba Cloud ACP & ACA certifications.",
                },
                {
                    tag: "AI & DevOps Ops",
                    variant: "primary",
                    title: "Autonomous AI Agents & Team Workflows",
                    desc: "Built an autonomous server-management AI agent from scratch in Python and shell scripts on Debian (reachable via Slack, Telegram, Discord, and API). Managing a 14-repository GitHub Organization with automated CI/CD, n8n task automation, and LiteLLM health monitoring for PusatTokenAI.",
                },
            ],
            contactTitle: "Contact & Links",
            terminalCtaTitle: "Prefer exploring via the command line?",
            terminalCtaText: "Switch to the Terminal tab to run slash commands like /projects, /project goodlink-ecosystem, or /cv.",
            terminalCtaButton: "Open Terminal",
        },
        projects: [
            {
                slug: "goodlink-ecosystem",
                title: "GoodLink, KiosOke & D'antar",
                desc: "Digital cooperative platform (serving 8 cooperatives), marketplace, and delivery apps built with Laravel 11 DDD & MariaDB.",
                tag: "Laravel 11",
                details: "Leading development of GoodLink Host & Client (powering 8 active digital cooperatives in East Java), KiosOke (marketplace), and D'antar (delivery/expedition).\nLed the architectural refactoring of GoodLink Client to Laravel 11 with a modular Domain-Driven Design (DDD) structure, backed by Laravel feature tests and Postman API testing.",
            },
            {
                slug: "payment-adapter",
                title: "Payment Adapter & PPOB Bridge",
                desc: "Transaction bridge connecting GoodLink with MME and TokoAtlas PPOB biller aggregators using Laravel, Filament, Redis, and MariaDB.",
                tag: "Payment",
                details: "Designed and architected the Payment Adapter from the ground up—starting from the formal SKPL requirements specification through SDLC and Agile delivery.\nBuilt with Laravel, Filament, Redis, and MariaDB to connect GoodLink Client with MME (.NET PPOB aggregator maintained via VNC) and TokoAtlas, alongside KHOINS white-label Android integration.",
            },
            {
                slug: "ai-agent-ops",
                title: "GLOBISTEC Autonomous Server AI Agent",
                desc: "Debian server-management AI agent built from scratch with Python & shell scripts, accessible via Slack, Telegram, Discord, and API.",
                tag: "Python AI",
                details: "Built an autonomous AI agent from scratch using Python and shell scripts on a Debian server, grounded in GLOBISTEC's internal knowledge base.\nCapable of inspecting and managing server operations autonomously via Slack, Telegram, Discord, or HTTP API, alongside deploying and maintaining the Odoo-based Kolegaku agent orchestration platform.",
            },
            {
                slug: "pusattoken-ai",
                title: "PusatTokenAI & Model Health Monitor",
                desc: "OpenAI-compatible multi-model AI API gateway paired with automated LiteLLM endpoint health monitoring.",
                tag: "LiteLLM",
                details: "Maintained endpoint availability and technical marketing for PusatTokenAI, a pay-per-call OpenAI-compatible gateway providing unified access to multiple AI models.\nConfigured and operated LiteLLM health checks to continuously monitor every model endpoint listed on the platform.",
            },
            {
                slug: "cloud-devops",
                title: "Multi-Cloud Docker & 14-Repo DevOps",
                desc: "Tencent Cloud & BiznetGio Docker infrastructure, 14-repo GitHub CI/CD pipelines, and n8n workflow automation.",
                tag: "Cloud / DevOps",
                details: "Operated Ubuntu and Debian Docker hosts (GoodLink, GoodLink Host, GoodWater) across Tencent Cloud and BiznetGio, including VPC architecture, firewalls, routing, snapshots, backups, and Cloudflare DNS (GoodMedis).\nManaged 14 repositories in the GLOBISTEC & Qbiztec GitHub Organization with branch rules and automated CI/CD, Discord/Slack app logging, and JavaScript n8n automations for ClickUp task tracking.",
            },
            {
                slug: "nafis-me-app",
                title: "Terminal Portfolio (nafis-me-app)",
                desc: "This Claude Code-inspired light-theme terminal website with interactive tabs and bilingual support.",
                tag: "Astro",
                href: "https://github.com/MNafisN/nafis-me-app",
                details: "Personal website built with Astro and vanilla CSS custom properties.\nCombines an interactive terminal session (slash commands, autocomplete, and command history) with centered static page views in Indonesian and English.",
            },
        ],
        cv: {
            role: "CTO at PT. Global Bisnis Teknologi (GLOBISTEC) · B.Comp.Sc. ITS Surabaya",
            summary: [
                "CTO at PT. Global Bisnis Teknologi (Oct 2023 – Present): leading backend architecture (Laravel 11 DDD, MariaDB, Redis), Payment Adapter design, 14-repo GitHub CI/CD operations, and autonomous server AI agents.",
                "Cloud & Infrastructure: managing Tencent Cloud architecture (VPC, firewall, snapshots, backups), Ubuntu/Debian Docker servers on BiznetGio, Cloudflare, and certified in Alibaba Cloud ACP & ACA (2024).",
                "Education & Earlier Roles: B.Comp.Sc. in Computer Science from ITS Surabaya (GPA 3.34/4.00); previously IT Admin for Banjartanggul Local Government (1,030+ BPN land records) and Intern at PT. PJB (PLN Group).",
            ],
            pdf: "/files/cv.pdf",
        },
        contact: [
            { label: "GitHub (MNafisN)", href: "https://github.com/MNafisN" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/MNafisN/" },
            { label: "Email (nafisnoval7165@gmail.com)", href: "mailto:nafisnoval7165@gmail.com" },
        ],
    },
};

export function getProfile(lang = "id") {
    return profiles[lang === "en" ? "en" : "id"];
}

export const projects = profiles.id.projects;
export const cv = profiles.id.cv;
export const contact = profiles.id.contact;
