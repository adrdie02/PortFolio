if (window.p5) {
      const stage = document.getElementById('art-stage');
      new p5((p) => {
        let w = 1, h = 1, pulse = null;
        const nodes = [
          { x: .15, y: .28, label: 'UI' },
          { x: .49, y: .20, label: 'API' },
          { x: .82, y: .38, label: 'DATA' },
          { x: .45, y: .75, label: 'DEPLOY' }
        ];
        const edges = [[0,1],[1,2],[0,3],[3,1],[3,2]];
        function point(n) { return { x: n.x * w, y: n.y * h }; }
        p.setup = () => {
          w = Math.max(1, stage.clientWidth); h = Math.max(1, stage.clientHeight);
          p.createCanvas(w, h).parent(stage);
          p.pixelDensity(1); p.frameRate(30);
          if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) p.noLoop();
        };
        p.draw = () => {
          p.clear();
          const step = p.frameCount;
          p.stroke(35, 51, 40, 115); p.strokeWeight(1);
          for (let x = 22; x < w; x += 28) p.line(x, 0, x, h);
          for (let y = 18; y < h; y += 28) p.line(0, y, w, y);
          edges.forEach(([a,b],i) => {
            const A = point(nodes[a]), B = point(nodes[b]);
            p.stroke(77, 101, 80, 125); p.strokeWeight(1); p.line(A.x,A.y,B.x,B.y);
            const t = ((step * (.003 + i * .00023) + i * .21) % 1);
            const px = p.lerp(A.x,B.x,t), py = p.lerp(A.y,B.y,t);
            p.noStroke(); p.fill(182,245,121,45); p.circle(px,py,11);
            p.fill(182,245,121,235); p.circle(px,py,3.2);
          });
          nodes.forEach((n,i) => {
            const q = point(n), breathe = 5 + Math.sin(step * .035 + i) * 1.2;
            p.noStroke(); p.fill(182,245,121,20); p.circle(q.x,q.y,breathe*4);
            p.fill(182,245,121,235); p.circle(q.x,q.y,5);
            p.noFill(); p.stroke(182,245,121,60); p.circle(q.x,q.y,16 + Math.sin(step*.03+i)*2);
          });
          if (pulse) {
            const age = (p.millis() - pulse.time) / 900;
            if (age < 1) { p.noFill(); p.stroke(182,245,121,180*(1-age)); p.circle(pulse.x,pulse.y,age*72); }
            else pulse = null;
          }
        };
        p.mousePressed = () => { if (p.mouseX >= 0 && p.mouseX <= w && p.mouseY >= 0 && p.mouseY <= h) pulse = { x:p.mouseX, y:p.mouseY, time:p.millis() }; };
        p.windowResized = () => { w = Math.max(1, stage.clientWidth); h = Math.max(1, stage.clientHeight); p.resizeCanvas(w,h); };
      });
    }

(() => {
      const itToEn = {
        "Progetti":"Projects", "Esperienza":"Experience", "Competenze":"Skills", "Contatto":"Contact",
        "SALERNO, ITALIA":"SALERNO, ITALY", "Sviluppatore web · Salerno, Italia":"Web developer · Salerno, Italy",
        "Dalle idee":"From ideas", "alle":"to", "app web.":"web apps.", "Sono Adrián,":"I'm Adrián,",
        "sviluppatore frontend e full stack":"a frontend and full-stack developer",
        "con oltre cinque anni di esperienza freelance. Progetto interfacce React, API e database, seguendo il prodotto dal primo requisito fino al deploy.":"with over five years of freelance experience. I build React interfaces, APIs, and databases, taking projects from requirements through deployment.",
        "Parliamo di lavoro":"Let's talk about work", "Vedi i progetti":"View projects", "Disponibile per trasferimento":"Open to relocation",
        "Flusso di sviluppo":"Development flow", "visualizzazione":"visualization", "Progetti selezionati":"Selected projects", "01 / LAVORI":"01 / PROJECTS",
        "Piattaforma full stack per la gestione di una palestra, sviluppata come progetto finale del corso di Sviluppo di Applicazioni Web (DAW). Include una SPA in React, API REST in Node.js e database SQL Server, con autenticazione JWT e accessi per ruolo. Il modello copre iscrizioni, inventario, prenotazioni con controllo delle sovrapposizioni e assistenza.":"Full-stack gym management platform built as a final project for a web application development course. It combines a React SPA, a Node.js REST API, and SQL Server, with JWT authentication and role-based access. The data model covers memberships, inventory, bookings with schedule-conflict checks, and support.",
        "Codice su GitHub":"Source on GitHub",
        "E-commerce streetwear realizzato con React e TypeScript. Autenticazione e dati sono gestiti con Supabase; il progetto organizza l'interfaccia in componenti, pagine, hook e contesti dedicati ad account e carrello. Include test con Vitest e Playwright e workflow GitHub Actions.":"A streetwear e-commerce app built with React and TypeScript. Supabase handles authentication and data; the interface is organized into components, pages, hooks, and account and cart contexts. The project includes Vitest and Playwright tests and a GitHub Actions workflow.",
        "02 / PERCORSO":"02 / EXPERIENCE", "Sviluppo applicazioni web e ho esperienza anche in":"I build web applications and also have experience in", "analisi dei dati e infrastruttura.":"data analysis and infrastructure.",
        "2020 — OGGI":"2020 — PRESENT", "Web Developer freelance":"Freelance Web Developer",
        "Siti, landing page e negozi online per clienti locali e piccole imprese. Gestione end-to-end: raccolta requisiti, sviluppo, integrazioni, deploy e manutenzione.":"Websites, landing pages, and online stores for local clients and small businesses. End-to-end project work: requirements, development, integrations, deployment, and maintenance.",
        "GEN — GIU 2026":"JAN — JUN 2026", "Pipeline di estrazione e trasformazione dati con Python, dashboard Power BI e definizione di metriche con il team di analytics.":"Built Python pipelines for data extraction and transformation, Power BI dashboards, and business metrics with the analytics team.",
        "Tecnico informatico · DigiCOPY":"IT Technician · DigiCOPY", "Supporto tecnico, diagnosi e riparazione hardware/software, configurazione di dispositivi e reti locali.":"Provided technical support, diagnosed and repaired hardware and software, and configured devices and local networks.",
        "03 / STACK":"03 / TOOLKIT", "Dati":"Data", "Strumenti":"Tools", "Formazione":"Education", "04 / STUDI":"04 / EDUCATION",
        "Sviluppo di applicazioni web (DAW)":"Web Application Development (DAW)", "thePower Business School · Certificazione Microsoft Azure":"thePower Business School · Microsoft Azure certification",
        "Sistemi microinformatici e reti":"Microcomputer Systems and Networks", "Formazione professionale di grado intermedio · Certificazione Cisco":"Intermediate vocational qualification · Cisco certification",
        "Lingue":"Languages", "05 / COMUNICAZIONE":"05 / LANGUAGES", "Spagnolo":"Spanish", "Madrelingua":"Native", "Inglese":"English",
        "Avanzato · uso professionale":"Advanced · professional working proficiency", "Italiano":"Italian", "Intermedio":"Intermediate",
        "Prossimo passo":"Next step", "Cerchi uno sviluppatore":"Looking for a developer", "per il tuo team?":"for your team?",
        "Vivo a Salerno e sono disponibile per trasferirmi. Scrivimi per parlare di una posizione o di un progetto.":"I'm based in Salerno and open to relocation. Get in touch about a role or project.",
        "© 2026 Adrián Muñoz Diego · Salerno, Italia":"© 2026 Adrián Muñoz Diego · Salerno, Italy"
      };
      const enToIt = Object.fromEntries(Object.entries(itToEn).map(([it,en]) => [en,it]));
      function setLanguage(lang) {
        const lookup = lang === 'en' ? itToEn : enToIt;
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
          const original = node.nodeValue, text = original.trim();
          if (!lookup[text]) continue;
          const leading = original.match(/^\s*/)[0], trailing = original.match(/\s*$/)[0];
          node.nodeValue = leading + lookup[text] + trailing;
        }
        document.documentElement.lang = lang;
        document.title = lang === 'en' ? 'Adrián Muñoz Diego — Web Developer' : 'Adrián Muñoz Diego — Sviluppatore web';
        document.querySelector('.lang-toggle').setAttribute('aria-label', lang === 'en' ? 'Language' : 'Lingua');
        document.querySelector('.nav-links').setAttribute('aria-label', lang === 'en' ? 'Main navigation' : 'Navigazione principale');
        document.querySelector('.brand').setAttribute('aria-label', lang === 'en' ? 'Adrián Muñoz Diego, home' : 'Adrián Muñoz Diego, inizio pagina');
        document.querySelector('#art-stage').setAttribute('aria-label', lang === 'en' ? 'Abstract animation connecting interface, API, database, and deployment' : 'Animazione astratta di interfaccia, API, database e deploy collegati');
        document.querySelectorAll('[data-language]').forEach(button => {
          const active = button.dataset.language === lang;
          button.classList.toggle('is-active', active);
          button.setAttribute('aria-pressed', String(active));
        });
      }
      document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.language)));
    })();
