// Internationalization System
const i18n = {
    fr: {
        nav: {
            home: "Home",
            parcours: "Parcours", 
            experiences: "Expériences",
            projets: "Projets",
            passions: "Passions",
            competences: "Compétences", 
            explorations: "Explorations",
            recommandations: "Recommandations",
            contact: "Contact"
        },
        home: {
            welcome: "Bienvenue sur mon portfolio",
            welcome_en: "Welcome to my portfolio",
            cta: "Travaillons ensemble"
        },
        contact: {
            title: "Contact & Échanges",
            estimation: "Challengez mon expertise : Estimation Gratuite",
            mission: "Futur Collaborateur (Job / Stage / Alternance)"
        }
    },
    en: {
        nav: {
            home: "Home",
            parcours: "Education",
            experiences: "Experience", 
            projets: "Projects",
            passions: "Passions",
            competences: "Skills",
            explorations: "Explorations",
            recommandations: "Recommendations",
            contact: "Contact"
        },
        home: {
            welcome: "Welcome to my portfolio",
            welcome_fr: "Bienvenue sur mon portfolio", 
            cta: "Let's work together"
        },
        contact: {
            title: "Contact & Exchanges",
            estimation: "Challenge my expertise: Free Estimation",
            mission: "Future Collaborator (Job / Internship / Apprenticeship)"
        }
    },
    es: {
        nav: {
            home: "Inicio",
            parcours: "Formación",
            experiences: "Experiencia",
            projets: "Proyectos", 
            passions: "Pasiones",
            competences: "Competencias",
            explorations: "Exploraciones",
            recommandations: "Recomendaciones",
            contact: "Contacto"
        },
        home: {
            welcome: "Bienvenido a mi portafolio",
            welcome_fr: "Bienvenue sur mon portfolio",
            cta: "Trabajemos juntos"
        },
        contact: {
            title: "Contacto & Intercambios",
            estimation: "Desafía mi experiencia: Estimación Gratuita", 
            mission: "Colaborador Futuro (Trabajo / Pasantía / Aprendizaje)"
        }
    }
};

let currentLang = 'fr';
let typewriterInterval;
let currentPhraseIndex = 0;

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    initializeApp();
});

function initializeApp() {
    // Initialize preloader
    initializePreloader();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize language system
    initializeLanguage();
    
    // Initialize theme toggle
    initializeTheme();
    
    // Initialize smooth scroll
    initializeSmoothScroll();
    
    // Initialize scroll spy
    initializeScrollSpy();
    
    // Initialize parallax
    initializeParallax();
    
    // Initialize typewriter
    initializeTypewriter();
    
    // Initialize modal system
    initializeModal();
    
    // Initialize lightbox
    initializeLightbox();
    
    // Initialize lightbox events
    initializeLightboxEvents();
    
    // Initialize contact form
    initializeContactForm();
}

// Preloader and Video System
function initializePreloader() {
    const preloader = document.getElementById('preloader');
    const enterBtn = document.getElementById('enterBtn');
    const videoModal = document.getElementById('videoModal');
    const introVideo = document.getElementById('introVideo');
    const skipText = document.getElementById('skipText');
    
    if (enterBtn) {
        enterBtn.addEventListener('click', playIntroVideo);
    }
    
    if (skipText) {
        skipText.addEventListener('click', skipVideo);
    }
    
    if (videoModal) {
        videoModal.addEventListener('click', skipVideo);
    }
    
    if (introVideo) {
        introVideo.addEventListener('ended', closeVideoModal);
    }
}

function playIntroVideo() {
    const preloader = document.getElementById('preloader');
    const videoModal = document.getElementById('videoModal');
    const introVideo = document.getElementById('introVideo');
    const videoProgress = document.getElementById('videoProgress');
    
    // First, scroll to top instantly without animation
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    // Then show video modal over everything
    videoModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Reset progress bar
    if (videoProgress) {
        videoProgress.style.width = '0%';
    }
    
    // Play video immediately
    introVideo.play().catch(e => {
        console.log('Autoplay prevented, user will need to click');
    });
    
    // Update progress bar during video playback
    introVideo.addEventListener('timeupdate', () => {
        if (videoProgress && introVideo.duration) {
            const progress = (introVideo.currentTime / introVideo.duration) * 100;
            videoProgress.style.width = progress + '%';
        }
    });
    
    // Auto-close when video ends
    introVideo.addEventListener('ended', () => {
        if (videoProgress) {
            videoProgress.style.width = '100%';
        }
        setTimeout(() => {
            closeVideoModal();
        }, 500);
    });
    
    // Re-initialize Lucide icons
    setTimeout(() => {
        lucide.createIcons();
    }, 100);
}

function skipVideo(event) {
    event.preventDefault();
    closeVideoModal();
}

function closeVideoModal() {
    const videoModal = document.getElementById('videoModal');
    const introVideo = document.getElementById('introVideo');
    const preloader = document.getElementById('preloader');
    
    // Stop video
    introVideo.pause();
    introVideo.currentTime = 0;
    
    // Hide video modal
    videoModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    
    // Hide preloader
    preloader.style.display = 'none';
    
    // Initialize parallax
    initializeParallax();
}

// Mobile Menu
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

// Language System
function initializeLanguage() {
    const langToggle = document.getElementById('langToggle');
    
    if (langToggle) {
        langToggle.addEventListener('click', switchLanguage);
    }
}

function switchLanguage() {
    const languages = ['fr', 'en', 'es'];
    const flags = ['🇫🇷', '🇬🇧', '🇪🇸'];
    const currentIndex = languages.indexOf(currentLang);
    const nextIndex = (currentIndex + 1) % languages.length;
    
    currentLang = languages[nextIndex];
    const currentFlag = document.getElementById('currentFlag');
    
    if (currentFlag) {
        currentFlag.textContent = flags[nextIndex];
    }
    
    updateLanguage();
}

function updateLanguage() {
    const translations = i18n[currentLang];
    
    // Update navigation
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let value = translations;
        
        for (const k of keys) {
            value = value[k];
        }
        
        if (value) {
            element.textContent = value;
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLang;
}

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getNestedProperty(i18n[lang], key);
        if (translation) {
            element.textContent = translation;
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLang;
    
    // Le typewriter de home reste inchangé - ne pas réinitialiser
}

// Theme System
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.classList.toggle('dark', savedTheme === 'dark');
        updateThemeIcon(savedTheme === 'dark');
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.toggle('dark');
    
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
}

function updateThemeIcon(isDark) {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
            lucide.createIcons();
        }
    }
}

// Smooth Scroll
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Scroll Spy
function initializeScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    function updateActiveNav() {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('text-white');
                    link.classList.add('text-white/80');
                    
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.remove('text-white/80');
                        link.classList.add('text-white');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
}

// Parallax Effect
function initializeParallax() {
    const homeSection = document.getElementById('home');
    if (!homeSection) return;
    
    homeSection.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { offsetWidth, offsetHeight } = homeSection;
        
        // Calcul du décalage (entre -0.5 et 0.5)
        const xPos = (clientX - offsetWidth / 2) / offsetWidth;
        const yPos = (clientY - offsetHeight / 2) / offsetHeight;
        
        const bgImage = homeSection.querySelector('.parallax-bg');
        if (bgImage) {
            // On reste sur une amplitude de 40px pour un effet visible mais safe
            // Le scale(1.05) aide aussi à masquer les bords au cas où
            bgImage.style.transform = `translate(${xPos * 40}px, ${yPos * 40}px) scale(1.05)`;
        }
    });
}

// Typewriter Effect
function initializeTypewriter() {
    const typewriterElement = document.getElementById('typewriterText');
    if (!typewriterElement) return;
    
    // Phrases fixes qui alternent toujours entre français et anglais
    const phrases = [
        "Bienvenue sur mon portfolio",
        "Welcome to my portfolio"
    ];
    
    let currentPhrase = phrases[currentPhraseIndex];
    let charIndex = 0;
    
    // Clear existing interval
    if (typewriterInterval) {
        clearInterval(typewriterInterval);
    }
    
    function typeWriter() {
        if (charIndex < currentPhrase.length) {
            typewriterElement.textContent += currentPhrase.charAt(charIndex);
            charIndex++;
        } else {
            // Move to next phrase
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            currentPhrase = phrases[currentPhraseIndex];
            charIndex = 0;
            typewriterElement.textContent = '';
        }
    }
    
    // Start typewriter effect
    typewriterInterval = setInterval(typeWriter, 100);
}

// Modal System
function initializeModal() {
    const modalOverlay = document.getElementById('modalOverlay');
    const closeModal = document.getElementById('closeModal');
    
    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunction);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModalFunction();
            }
        });
    }
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModalFunction();
        }
    });
}

function openModal(modalId) {
    const modalOverlay = document.getElementById('modalOverlay');
    const modalContent = document.getElementById('modalContent');
    
    if (!modalOverlay || !modalContent) return;
    
    // Load modal content based on ID
    loadModalContent(modalId, modalContent);
    
    // Show modal
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Re-initialize Lucide icons
    setTimeout(() => {
        lucide.createIcons();
    }, 100);
}

function closeModalFunction() {
    const modalOverlay = document.getElementById('modalOverlay');
    
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function loadModalContent(modalId, titleElement, contentElement) {
    const modalContents = {
        'bts-immobilier': `
            <div class="space-y-6">
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Environnement juridique et économique des activités immobilières</h3>
                    <p class="text-gray-300 mb-4">Découverte du cadre juridique de l'immobilier, des bases du droit des contrats, de la propriété, des obligations, et des grands mécanismes économiques liés au marché immobilier.</p>
                    <p class="text-blue-400">🎯 Objectif : Comprendre l'environnement réglementaire et économique du métier.</p>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Vente immobilière et négociation commerciale</h3>
                    <p class="text-gray-300 mb-4">Techniques de prospection, argumentaire de vente, traitement des objections, analyse du besoin client, fixation du prix, négociation et suivi de la transaction.</p>
                    <p class="text-blue-400">🎯 Objectif : Devenir un intermédiaire efficace capable de transformer un besoin en signature.</p>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Gestion locative et suivi administratif</h3>
                    <p class="text-gray-300 mb-4">Rédaction du bail, entrée et sortie du locataire, suivi des loyers, charges, quittances, révision de loyer, gestion des incidents, relation bailleur-locataire.</p>
                    <p class="text-blue-400">🎯 Objectif : Sécuriser la location et assurer le suivi administratif et financier du bien.</p>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Administration des copropriétés et de l'habitat social</h3>
                    <p class="text-gray-300 mb-4">Fonctionnement de la copropriété, assemblée générale, syndic, règlement de copropriété, répartition des charges, entretien des parties communes, gestion des décisions collectives.</p>
                    <p class="text-blue-400">🎯 Objectif : Administrer un immeuble dans le respect du cadre légal et collectif.</p>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Conseil en gestion du bâti dans le contexte de changement climatique</h3>
                    <p class="text-gray-300 mb-4">Lecture technique du bâti, pathologies du bâtiment, entretien, rénovation énergétique, isolation, performance énergétique, adaptation aux enjeux climatiques et réglementaires.</p>
                    <p class="text-blue-400">🎯 Objectif : Conseiller sur la valorisation, la conservation et l'amélioration du patrimoine immobilier.</p>
                </div>
                
                <div class="mt-6">
                    <a href="Cours/Analyse du marché local 83.pdf" target="_blank" class="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                        <i data-lucide="file-text" class="w-4 h-4 mr-2"></i>
                        Lien vers mon dossier : Analyse du marché local 83
                    </a>
                </div>
                
                <div class="filmstrip mt-6">
                    <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/parcours/BTS Immobilier/nepasutiliser.jpg', 'Images/parcours/BTS Immobilier/visites.jpg'], 0)">
                        <img src="Images/parcours/BTS Immobilier/nepasutiliser.jpg" alt="Documents BTS" class="w-full h-full object-cover">
                    </div>
                    <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/parcours/BTS Immobilier/nepasutiliser.jpg', 'Images/parcours/BTS Immobilier/visites.jpg'], 1)">
                        <img src="Images/parcours/BTS Immobilier/visites.jpg" alt="Visites" class="w-full h-full object-cover">
                    </div>
                </div>
            </div>
        `,
        
        'but-rt': `
            <div class="space-y-6">
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Cybersécurité</h3>
                    <p class="text-gray-300 mb-4">Apprentissage des protocoles de sécurité, de la protection des flux de données et de la gestion des vulnérabilités.</p>
                    <p class="text-blue-400">🧠 Ce qu'il faut retenir : Une rigueur d'analyse "système" qui me permet aujourd'hui de comprendre les enjeux digitaux de l'immobilier.</p>
                    <div class="mt-4 bg-black/30 rounded-lg p-4 border border-white/10">
                        <div class="filmstrip">
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/parcours/BUT R&T/setup.JPG', 'Images/parcours/BUT R&T/config1.JPG', 'Images/parcours/BUT R&T/python.png'], 0)">
                                <img src="Images/parcours/BUT R&T/setup.JPG" alt="Setup Cybersécurité" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Infrastructures Réseaux</h3>
                    <p class="text-gray-300 mb-4">Configuration d'équipements réseaux et compréhension du transport de l'information.</p>
                    <p class="text-blue-400">💡 Lien métier : À l'heure de la "PropTech", maîtriser les bases techniques est un atout pour la digitalisation des agences.</p>
                    <div class="mt-4 bg-black/30 rounded-lg p-4 border border-white/10">
                        <div class="filmstrip">
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/parcours/BUT R&T/setup.JPG', 'Images/parcours/BUT R&T/config1.JPG', 'Images/parcours/BUT R&T/python.png'], 1)">
                                <img src="Images/parcours/BUT R&T/config1.JPG" alt="Configuration réseau" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Programmation (Python)</h3>
                    <p class="text-gray-300 mb-4">Développement de scripts pour automatiser des tâches et résoudre des problèmes logiques complexes.</p>
                    <div class="mt-4 bg-black/30 rounded-lg p-4 border border-white/10">
                        <div class="filmstrip">
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/parcours/BUT R&T/setup.JPG', 'Images/parcours/BUT R&T/config1.JPG', 'Images/parcours/BUT R&T/python.png'], 2)">
                                <img src="Images/parcours/BUT R&T/python.png" alt="Python" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        
        'bac-general': `
            <h2 class="text-3xl font-bold mb-6">🎓 Baccalauréat Général</h2>
            <div class="space-y-6">
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Mathématiques</h3>
                    <p class="text-gray-300 mb-4">Maîtrise des probabilités, des statistiques et de l'analyse. Une base solide pour tous les calculs de rentabilité et de fiscalité immobilière.</p>
                    <div class="mt-4 cursor-pointer" onclick="openLightbox(['Images/parcours/Bac général/math.jpg', 'Images/parcours/Bac général/cours.jpg'], 0)">
                        <img src="Images/parcours/Bac général/math.jpg" alt="Mathématiques" class="w-full h-48 object-cover rounded-lg hover:transform hover:scale-105 transition-all duration-300">
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 NSI (Numérique et Sciences Informatiques)</h3>
                    <p class="text-gray-300 mb-4">Étude des algorithmes, des bases de données (SQL) et des architectures matérielles.</p>
                    <p class="text-blue-400">🛠️ Projet marquant : Création d'un programme de gestion de données, première approche de la structuration d'informations complexes.</p>
                    <div class="mt-4 cursor-pointer" onclick="openLightbox(['Images/parcours/Bac général/math.jpg', 'Images/parcours/Bac général/cours.jpg'], 1)">
                        <img src="Images/parcours/Bac général/cours.jpg" alt="NSI" class="w-full h-48 object-cover rounded-lg hover:transform hover:scale-105 transition-all duration-300">
                    </div>
                </div>
            </div>
        `,
        
        'simulateur': `
            <h2 class="text-3xl font-bold mb-6">📈 Simulateur d'Estimation "Expert"</h2>
            <p class="text-gray-300 mb-6">Un outil sérieux pour transformer un simple visiteur en prospect qualifié.</p>
            
            <div class="glassmorphism-dark rounded-lg p-6">
                <h3 class="text-xl font-bold mb-4">🔵 Algorithme de Calcul de Valeur</h3>
                <p class="text-gray-300 mb-4">Contrairement aux simulateurs basiques, cet outil intègre des coefficients de pondération réels : état des diagnostics, nuisances sonores, potentiel d'agrandissement et prix au actualisé du secteur.</p>
                <p class="text-blue-400">🧠 Ce qu'il faut retenir : L'outil donne une fourchette, mais souligne l'importance de l'œil de l'expert pour affiner le prix final.</p>
            </div>
            
            <div class="glassmorphism-dark rounded-lg p-6 mt-6">
                <h3 class="text-xl font-bold mb-4">🔵 Expérience Utilisateur (UX)</h3>
                <p class="text-gray-300 mb-6">Interface intuitive où l'utilisateur remplit ses critères et reçoit une analyse synthétique immédiate.</p>
                
                <div id="simulatorForm" class="space-y-4">
                    <div class="grid md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-gray-300 mb-2">Surface habitable (m²)</label>
                            <input type="number" id="surface" class="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white" placeholder="100" value="100">
                        </div>
                        <div>
                            <label class="block text-gray-300 mb-2">Surface terrain (m²)</label>
                            <input type="number" id="terrain" class="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white" placeholder="500" value="500">
                        </div>
                    </div>
                    
                    <div class="grid md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-gray-300 mb-2">Nombre de pièces</label>
                            <select id="pieces" class="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white">
                                <option value="1">1 pièce</option>
                                <option value="2">2 pièces</option>
                                <option value="3" selected>3 pièces</option>
                                <option value="4">4 pièces</option>
                                <option value="5">5 pièces</option>
                                <option value="6">6+ pièces</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-gray-300 mb-2">Secteur</label>
                            <select id="secteur" class="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white">
                                <option value="aubagne">Aubagne</option>
                                <option value="marseille">Marseille</option>
                                <option value="roquevaire">Roquevaire</option>
                                <option value="brignoles">Brignoles</option>
                                <option value="la_destrousse">La Destrousse</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="grid md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-gray-300 mb-2">État général</label>
                            <select id="etat" class="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white">
                                <option value="neuf">Neuf</option>
                                <option value="bon">Bon état</option>
                                <option value="rafraichir">À rafraîchir</option>
                                <option value="travaux">Travaux importants</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-gray-300 mb-2">DPE</label>
                            <select id="dpe" class="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white">
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D" selected>D</option>
                                <option value="E">E</option>
                                <option value="F">F</option>
                                <option value="G">G</option>
                            </select>
                        </div>
                    </div>
                    
                    <div>
                        <label class="block text-gray-300 mb-2">Travaux estimés (€)</label>
                        <input type="number" id="travaux" class="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white" placeholder="10000" value="0">
                    </div>
                    
                    <button type="button" onclick="calculateEstimation()" class="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                        🎯 Calculer l'estimation
                    </button>
                </div>
                
                <div id="estimationResult" class="hidden mt-6 p-6 bg-green-900/20 border border-green-500 rounded-lg">
                    <h4 class="text-xl font-bold mb-4 text-green-400">📊 Résultat de l'estimation</h4>
                    <div id="resultContent" class="space-y-2">
                        <!-- Results will be displayed here -->
                    </div>
                    <div class="mt-4 text-sm text-gray-400">
                        <p>⚠️ Cette estimation est indicative et basée sur les données du marché. Une visite sur place est nécessaire pour affiner le prix.</p>
                    </div>
                </div>
            </div>
        `,
        
        'crm-immobilier': `
            <h2 class="text-3xl font-bold mb-6">📊 CRM Immobilier : L'outil de pilotage</h2>
            
            <div class="text-center mb-6">
                <img src="Images/Projets/QR.png" alt="QR Code CRM" class="w-48 h-48 mx-auto mb-4">
                <p class="text-blue-400 font-semibold">Scannez pour tester l'outil en direct</p>
                <a href="https://leclech-realestate.free.nf/?i=1" target="_blank" class="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors mt-4">
                    <i data-lucide="external-link" class="w-4 h-4 mr-2"></i>
                    Accéder au CRM
                </a>
            </div>
            
            <div class="glassmorphism-dark rounded-lg p-6">
                <p class="text-gray-300 mb-4">Ce projet fait le pont entre mon passé en Programmation (NSI/BUT) et mon futur en Immobilier.</p>
                
                <h3 class="text-xl font-bold mb-3">🔵 Architecture & Logique de Données</h3>
                <p class="text-gray-300 mb-4">Conception d'une base de données permettant de centraliser les fiches clients, les mandats et le suivi des acquéreurs.</p>
                <p class="text-blue-400">🎯 Objectif : Automatiser les rappels et ne jamais perdre le fil d'une négociation.</p>
            </div>
            
            <div class="glassmorphism-dark rounded-lg p-6 mt-6">
                <h3 class="text-xl font-bold mb-3">🔵 Fonctionnalités Métier</h3>
                <p class="text-gray-300 mb-4">Intégration de filtres de recherche multicritères (secteur, budget, type de bien) pour matcher instantanément un nouveau bien avec les besoins d'un acquéreur en base.</p>
                <p class="text-blue-400">🛠️ Tech utilisée : Logique algorithmique issue de mon parcours informatique pour optimiser les processus de vente.</p>
            </div>
        `,
        
        'stage-immobilier': `
            <h2 class="text-3xl font-bold mb-6">🏠 Stage en Agence Immobilière (ERA Roquevaire)</h2>
            
            <div class="space-y-6">
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Immersion en Négociation & Mandats</h3>
                    <p class="text-gray-300 mb-4">Participation active à la découverte des mandats (simples et exclusifs). Apprentissage des méthodes de prospection et de la qualification des prospects.</p>
                    <p class="text-blue-400">🎯 Objectif : Comprendre comment transformer un contact en projet de vie.</p>
                    <div class="mt-4 bg-black/30 rounded-lg p-4 border border-white/10">
                        <div class="filmstrip">
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/expériences/StageImmo/chalandise.png', 'Images/expériences/StageImmo/prospection.jpg', 'Images/expériences/StageImmo/plu.png'], 0)">
                                <img src="Images/expériences/StageImmo/chalandise.png" alt="Chalandise" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Visites & Relation Client</h3>
                    <p class="text-gray-300 mb-4">Accompagnement sur le terrain lors des visites de biens. Apprentissage de l'argumentaire de vente et de la mise en valeur des points forts d'un logement.</p>
                    <p class="text-blue-400">💡 Le plus : Analyse des retours clients pour ajuster la stratégie de commercialisation.</p>
                    <div class="mt-4 bg-black/30 rounded-lg p-4 border border-white/10">
                        <div class="filmstrip">
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/expériences/StageImmo/chalandise.png', 'Images/expériences/StageImmo/prospection.jpg', 'Images/expériences/StageImmo/plu.png'], 1)">
                                <img src="Images/expériences/StageImmo/prospection.jpg" alt="Prospection" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Cadre Juridique & Administratif</h3>
                    <p class="text-gray-300 mb-4">Suivi des dossiers de vente, étude des diagnostics techniques (DPE, ERP) et compréhension des étapes notariales.</p>
                    <div class="mt-4">
                        <a href="Cours/compte_rendu_stage.pdf" target="_blank" class="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                            <i data-lucide="file-text" class="w-4 h-4 mr-2"></i>
                            Mon compte-rendu de stage / Analyse d'un dossier de vente
                        </a>
                    </div>
                    <div class="mt-4 bg-black/30 rounded-lg p-4 border border-white/10">
                        <div class="filmstrip">
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/expériences/StageImmo/chalandise.png', 'Images/expériences/StageImmo/prospection.jpg', 'Images/expériences/StageImmo/plu.png'], 2)">
                                <img src="Images/expériences/StageImmo/plu.png" alt="PLU" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        
        'mcdonalds': `
            <h2 class="text-3xl font-bold mb-6">🍔 Employé Polyvalent (McDonald's La Destrousse)</h2>
            
            <div class="space-y-6">
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Travail sous pression & Rapidité</h3>
                    <p class="text-gray-300 mb-4">Gestion des flux lors des "rushs" (pics d'activité). Capacité à rester concentré et efficace quand le rythme s'accélère.</p>
                    <p class="text-blue-400">Une erreur de procédure coûte du temps. La précision dans la rapidité est une règle d'or.</p>
                    <div class="mt-4 bg-black/30 rounded-lg p-4 border border-white/10">
                        <div class="filmstrip">
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Expériences/Mcdo/emploi.PNG'], 0)">
                                <img src="Images/Expériences/Mcdo/emploi.PNG" alt="McDo emploi" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Hygiène & Respect des Procédures</h3>
                    <p class="text-gray-300 mb-4">Application rigoureuse des normes HACCP et des protocoles de sécurité alimentaire. Polyvalence totale sur les postes.</p>
                    <div class="mt-4 bg-black/30 rounded-lg p-4 border border-white/10">
                        <div class="filmstrip">
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Expériences/Mcdo/emploi.PNG'], 0)">
                                <img src="Images/Expériences/Mcdo/emploi.PNG" alt="HACCP" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Esprit d'Équipe & Coordination</h3>
                    <p class="text-gray-300 mb-4">Travail en synergie avec les collègues pour fluidifier le service. Communication claire et entraide constante.</p>
                    <div class="mt-4 bg-black/30 rounded-lg p-4 border border-white/10">
                        <div class="filmstrip">
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Expériences/Mcdo/emploi.PNG'], 0)">
                                <img src="Images/Expériences/Mcdo/emploi.PNG" alt="Équipe" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        
        'animateur': `
            <h2 class="text-3xl font-bold mb-6">🎯 Animateur BAFA (Aubagne & St-Zacharie)</h2>
            <p class="text-gray-300 mb-6">Le leadership et la gestion de l'humain.</p>
            
            <div class="space-y-6">
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Gestion de Groupe</h3>
                    <p class="text-gray-300 mb-4">Encadrement de groupes d'enfants et d'adolescents. Mise en place de plannings et d'activités pédagogiques. Maintenir une dynamique de groupe positive tout en assurant l'autorité.</p>
                    <div class="mt-4 bg-black/30 rounded-lg p-4 border border-white/10">
                        <div class="filmstrip">
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/expériences/animateur/carton.jpg', 'Images/expériences/animateur/animation.PNG', 'Images/expériences/animateur/planing.HEIC'], 0)">
                                <img src="Images/expériences/animateur/carton.jpg" alt="Groupe" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Sécurité & Responsabilité</h3>
                    <p class="text-gray-300 mb-4">Vigilance constante sur la sécurité physique et morale des mineurs. Gestion des risques lors des sorties et des activités.</p>
                    <div class="mt-4 bg-black/30 rounded-lg p-4 border border-white/10">
                        <div class="filmstrip">
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/expériences/animateur/carton.jpg', 'Images/expériences/animateur/animation.PNG', 'Images/expériences/animateur/planing.HEIC'], 1)">
                                <img src="Images/expériences/animateur/animation.PNG" alt="Sécurité" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Médiation & Résolution de Conflits</h3>
                    <p class="text-gray-300 mb-4">Intervenir avec calme et diplomatie lors de tensions. Écouter, comprendre et arbitrer de manière juste.</p>
                    <p class="text-blue-400">💡 Lien métier : La gestion des conflits en centre de loisirs est la meilleure école pour gérer les négociations tendues en immobilier.</p>
                    <div class="mt-4 bg-black/30 rounded-lg p-4 border border-white/10">
                        <div class="filmstrip">
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/expériences/animateur/carton.jpg', 'Images/expériences/animateur/animation.PNG', 'Images/expériences/animateur/planing.HEIC'], 2)">
                                <img src="Images/expériences/animateur/planing.HEIC" alt="Planning" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        
        // Analyse Marché
        'analyse-marche': `
            <h2 class="text-3xl font-bold mb-6">📉 Analyse Comparative de Marché (ACM)</h2>
            <div class="space-y-6">
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Étude du Secteur Var/Bouches-du-Rhône</h3>
                    <p class="text-gray-300 mb-4">Compilation des données de ventes réelles (DVF) sur les 24 derniers mois pour identifier les zones de forte demande et les prix moyens par quartier.</p>
                    <p class="text-blue-400">🎯 Objectif : Justifier chaque prix par des preuves tangibles et des statistiques locales.</p>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Analyse de la "Valeur Verte"</h3>
                    <p class="text-gray-300 mb-4">Étude de l'impact réel du DPE sur le prix de vente final dans la région. Comment transformer une passoire thermique en opportunité d'investissement.</p>
                </div>
            </div>
        `,
        
        // Stratégie Marketing
        'strategie-marketing': `
            <h2 class="text-3xl font-bold mb-6">📣 Stratégie Marketing & Visibilité</h2>
            <div class="space-y-6">
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Branding & Communication locale</h3>
                    <p class="text-gray-300 mb-4">Création de supports visuels (flyers, posts réseaux sociaux) avec une identité forte pour capter l'attention sur un secteur saturé.</p>
                    <div class="mt-4">
                        <a href="Cours/FLYER.pdf" target="_blank" class="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                            <i data-lucide="file-text" class="w-4 h-4 mr-2"></i>
                            Voir le flyer exemple
                        </a>
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Photographie & Mise en valeur</h3>
                    <p class="text-gray-300 mb-4">Application des techniques de "Home Staging" virtuel et de prise de vue grand-angle pour maximiser les clics sur les annonces.</p>
                </div>
            </div>
        `,
        
        'passions-voyage': `
            <h2 class="text-3xl font-bold mb-6">🌍 Voyage</h2>
            <div class="space-y-6">
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Découverte du monde & Cultures</h3>
                    <p class="text-gray-300 mb-4">Comprendre d'autres façons de penser, découvrir de nouveaux pays et aller à la rencontre d'autres cultures, c'est quelque chose qui me paraît essentiel. Pour moi, c'est une vraie ouverture d'esprit et quelque chose qui enrichit autant sur le plan personnel qu'humain. C'est mon objectif de vie principal, parce que je veux découvrir et comprendre le monde.</p>
                    <div class="mt-4 bg-black/30 rounded-lg p-4 border border-white/10">
                        <div class="filmstrip">
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/Voyage/Découverte du monde & Cultures/piscinedub.jpg'], 0)">
                                <img src="Images/Passions/Voyage/Découverte du monde & Cultures/piscinedub.jpg" alt="Voyage" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Aviation</h3>
                    <p class="text-gray-300 mb-4">L'aviation m'a toujours intrigué, même à une époque où je ne savais pas encore vraiment quoi faire, j'ai passé mon BIA, et ça m'a permis de découvrir un domaine qui m'impressionne toujours autant aujourd'hui. Le brevet d'ULM reste une option pour plus tard.</p>
                    <div class="mt-4 bg-black/30 rounded-lg p-4 border border-white/10">
                        <div class="filmstrip">
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/Voyage/Aviation/aviation_background.jpeg'], 0)">
                                <img src="Images/Passions/Voyage/Aviation/aviation_background.jpeg" alt="Aviation" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        
        'passions-architecture': `
            <h2 class="text-3xl font-bold mb-6">🏛️ Architecture</h2>
            <div class="space-y-6">
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Design Urbain</h3>
                    <p class="text-gray-300 mb-4">Ce domaine m'intéresse surtout pour la manière dont les villes évoluent et dont l'architecture peut donner du style et une vraie identité à un lieu.</p>
                    <div class="mt-4 bg-black/30 rounded-lg p-4 border border-white/10">
                        <div class="filmstrip">
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/Architecture/Design Urbain/mus.jpg'], 0)">
                                <img src="Images/Passions/Architecture/Design Urbain/mus.jpg" alt="Design Urbain" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Matériaux & Structures</h3>
                    <p class="text-gray-300 mb-4">Je trouve ça intéressant de voir comment un bâtiment est construit, des matériaux jusqu'aux finitions, même si je n'ai pas encore un gros niveau technique sur le sujet.</p>
                    <div class="mt-4 bg-black/30 rounded-lg p-4 border border-white/10">
                        <div class="filmstrip">
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/Architecture/Matériaux & Structures/mine.png', 'Images/Passions/Architecture/Matériaux & Structures/monaco.png', 'Images/Passions/Architecture/Matériaux & Structures/mosc (3).jpg'], 0)">
                                <img src="Images/Passions/Architecture/Matériaux & Structures/mine.png" alt="Matériaux" class="w-full h-full object-cover">
                            </div>
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/Architecture/Matériaux & Structures/mine.png', 'Images/Passions/Architecture/Matériaux & Structures/monaco.png', 'Images/Passions/Architecture/Matériaux & Structures/mosc (3).jpg'], 1)">
                                <img src="Images/Passions/Architecture/Matériaux & Structures/monaco.png" alt="Matériaux" class="w-full h-full object-cover">
                            </div>
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/Architecture/Matériaux & Structures/mine.png', 'Images/Passions/Architecture/Matériaux & Structures/monaco.png', 'Images/Passions/Architecture/Matériaux & Structures/mosc (3).jpg'], 2)">
                                <img src="Images/Passions/Architecture/Matériaux & Structures/mosc (3).jpg" alt="Matériaux" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        
        'passions-sports': `
            <h2 class="text-3xl font-bold mb-6">🏃 Sports</h2>
            
            <div class="space-y-6">
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Musculation</h3>
                    <p class="text-gray-300 mb-4">J'aime le côté progression, discipline et objectifs à atteindre petit à petit. C'est un sport qui montre bien l'importance de l'effort régulier pour obtenir des résultats. Pendant mon année à Luminy, j'ai aussi découvert la calisthénie, et j'ai trouvé le fait de travailler pour "débloquer" des figures (front lever, planche, handstand) vraiment intéressant ; Ça demande de vraiment maîtriser son corps, son équilibre et sa coordination.</p>
                    <div class="mt-4 bg-black/30 rounded-lg p-4 border border-white/10">
                        <div class="filmstrip">
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/sports/muscu/musculation9.jpeg', 'Images/Passions/sports/muscu/musculation6.jpeg', 'Images/Passions/sports/muscu/musculation_background.jpeg'], 0)">
                                <img src="Images/Passions/sports/muscu/musculation9.jpeg" alt="Musculation" class="w-full h-full object-cover">
                            </div>
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/sports/muscu/musculation9.jpeg', 'Images/Passions/sports/muscu/musculation6.jpeg', 'Images/Passions/sports/muscu/musculation_background.jpeg'], 1)">
                                <img src="Images/Passions/sports/muscu/musculation6.jpeg" alt="Musculation" class="w-full h-full object-cover">
                            </div>
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/sports/muscu/musculation9.jpeg', 'Images/Passions/sports/muscu/musculation6.jpeg', 'Images/Passions/sports/muscu/musculation_background.jpeg'], 2)">
                                <img src="Images/Passions/sports/muscu/musculation_background.jpeg" alt="Musculation" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Ski</h3>
                    <p class="text-gray-300 mb-4">C'est un sport que j'ai eu la chance de commencer jeune, et aujourd'hui j'ai un bon niveau qui me permet de vraiment me faire plaisir et d'être plus libre dans ma pratique. J'aime la vitesse, mais surtout le style, les beaux mouvements et les sensations que ça procure. Et honnêtement, la poudreuse, c'est ce que je préfère : il y a une vraie sensation de flotter avec une impression de légèreté et de liberté que je retrouve rarement ailleurs.</p>
                    <div class="mt-4 bg-black/30 rounded-lg p-4 border border-white/10">
                        <div class="filmstrip">
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/sports/ski/ski_background.jpeg'], 0)">
                                <img src="Images/Passions/sports/ski/ski_background.jpeg" alt="Ski" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 VTT</h3>
                    <p class="text-gray-300 mb-4">J'en ai fait pendant 2 ans en club, et j'aime encore en refaire de temps en temps. Ce que j'aime dans ce sport, c'est qu'il fait travailler à la fois les muscles, l'endurance et la technique. Il y a aussi de vraies sensations dans les singles, où il faut rester concentré et réactif. C'est un sport qui me plaît parce qu'il mélange effort, plaisir et sensations fortes.</p>
                    <div class="mt-4 bg-black/30 rounded-lg p-4 border border-white/10">
                        <div class="filmstrip">
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/sports/vtt/boue.png', 'Images/Passions/sports/vtt/tramplin.JPG', 'Images/Passions/sports/vtt/velo8.jpeg', 'Images/Passions/sports/vtt/velo_background.jpeg'], 0)">
                                <img src="Images/Passions/sports/vtt/boue.png" alt="VTT" class="w-full h-full object-cover">
                            </div>
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/sports/vtt/boue.png', 'Images/Passions/sports/vtt/tramplin.JPG', 'Images/Passions/sports/vtt/velo8.jpeg', 'Images/Passions/sports/vtt/velo_background.jpeg'], 1)">
                                <img src="Images/Passions/sports/vtt/tramplin.JPG" alt="VTT" class="w-full h-full object-cover">
                            </div>
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/sports/vtt/boue.png', 'Images/Passions/sports/vtt/tramplin.JPG', 'Images/Passions/sports/vtt/velo8.jpeg', 'Images/Passions/sports/vtt/velo_background.jpeg'], 2)">
                                <img src="Images/Passions/sports/vtt/velo8.jpeg" alt="VTT" class="w-full h-full object-cover">
                            </div>
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/sports/vtt/boue.png', 'Images/Passions/sports/vtt/tramplin.JPG', 'Images/Passions/sports/vtt/velo8.jpeg', 'Images/Passions/sports/vtt/velo_background.jpeg'], 3)">
                                <img src="Images/Passions/sports/vtt/velo_background.jpeg" alt="VTT" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Course à pied</h3>
                    <p class="text-gray-300 mb-4">La course à pied aide beaucoup à travailler le souffle, l'endurance et surtout le mental. C'est une activité qui apprend à tenir dans la durée, à rester régulier et à ne pas lâcher quand c'est plus difficile. Elle développe une vraie persévérance, utile aussi dans les projets de longue durée.</p>
                    <div class="mt-4 bg-black/30 rounded-lg p-4 border border-white/10">
                        <div class="filmstrip">
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/sports/course/course_background.jpeg'], 0)">
                                <img src="Images/Passions/sports/course/course_background.jpeg" alt="Course" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Randonnée</h3>
                    <p class="text-gray-300 mb-4">C'est une vraie occasion de prendre du recul, de souffler un peu et de profiter pleinement de ce qui nous entoure. De plus On vit dans une région qui offre de superbes parcours, entre calanques, Sainte-Baume, Verdon, les sentiers vers Saint-Tropez….</p>
                    <div class="mt-4 bg-black/30 rounded-lg p-4 border border-white/10">
                        <div class="filmstrip">
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/sports/Rando/sttrop.JPG'], 0)">
                                <img src="Images/Passions/sports/Rando/sttrop.JPG" alt="Randonnée" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        
        'passions-automobile': `
            <h2 class="text-3xl font-bold mb-6"> ️ Automobile</h2>
            
            <div class="space-y-6">
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Événements (GT4, GP Historique Le Castellet)</h3>
                    <p class="text-gray-300 mb-4">Les événements automobiles permettent de voir de près l'élite du sport auto, en GT4, au Grand Prix Historique… Notamment avec le Castellet à proximité. Certains sont aussi très accessibles, parfois peu chers voire gratuits, car moins médiatisés que la F1. Pourtant, l'expérience reste incroyable, avec une vraie proximité des voitures, des équipes et l'ambiance du paddock. C'est une autre manière de vivre le sport auto, plus accessible mais tout aussi immersive.</p>
                    <div class="mt-4 bg-black/30 rounded-lg p-4 border border-white/10">
                        <div class="filmstrip">
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/Automobile/evenement/evenements.jpg', 'Images/Passions/Automobile/evenement/cocpite.jpg', 'Images/Passions/Automobile/evenement/garage.jpg', 'Images/Passions/Automobile/evenement/paul.jpg', 'Images/Passions/Automobile/evenement/rasso.PNG'], 0)">
                                <img src="Images/Passions/Automobile/evenement/evenements.jpg" alt="Événements" class="w-full h-full object-cover">
                            </div>
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/Automobile/evenement/evenements.jpg', 'Images/Passions/Automobile/evenement/cocpite.jpg', 'Images/Passions/Automobile/evenement/garage.jpg', 'Images/Passions/Automobile/evenement/paul.jpg', 'Images/Passions/Automobile/evenement/rasso.PNG'], 1)">
                                <img src="Images/Passions/Automobile/evenement/cocpite.jpg" alt="Événements" class="w-full h-full object-cover">
                            </div>
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/Automobile/evenement/evenements.jpg', 'Images/Passions/Automobile/evenement/cocpite.jpg', 'Images/Passions/Automobile/evenement/garage.jpg', 'Images/Passions/Automobile/evenement/paul.jpg', 'Images/Passions/Automobile/evenement/rasso.PNG'], 2)">
                                <img src="Images/Passions/Automobile/evenement/garage.jpg" alt="Événements" class="w-full h-full object-cover">
                            </div>
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/Automobile/evenement/evenements.jpg', 'Images/Passions/Automobile/evenement/cocpite.jpg', 'Images/Passions/Automobile/evenement/garage.jpg', 'Images/Passions/Automobile/evenement/paul.jpg', 'Images/Passions/Automobile/evenement/rasso.PNG'], 3)">
                                <img src="Images/Passions/Automobile/evenement/paul.jpg" alt="Événements" class="w-full h-full object-cover">
                            </div>
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/Automobile/evenement/evenements.jpg', 'Images/Passions/Automobile/evenement/cocpite.jpg', 'Images/Passions/Automobile/evenement/garage.jpg', 'Images/Passions/Automobile/evenement/paul.jpg', 'Images/Passions/Automobile/evenement/rasso.PNG'], 4)">
                                <img src="Images/Passions/Automobile/evenement/rasso.PNG" alt="Événements" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Karting</h3>
                    <p class="text-gray-300 mb-4">Le karting, c'est souvent par-là que commencent tous les pilotes pros. On ressent vraiment les sensations de pilotage, dans les virages comme dans les phases d'accélération, et c'est intéressant de pouvoir tester différents circuits. En plus, on a la chance d'en avoir de très bons aux alentours. C'est une bonne école pour développer les bases du pilotage (trajectoires, freinage, point de corde), ses réflexes et son sang-froid.</p>
                    <div class="mt-4 bg-black/30 rounded-lg p-4 border border-white/10">
                        <div class="filmstrip">
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/Automobile/Karting/karting1.jpg', 'Images/Passions/Automobile/Karting/ligne.png', 'Images/Passions/Automobile/Karting/kartcast.jpg'], 0)">
                                <img src="Images/Passions/Automobile/Karting/karting1.jpg" alt="Karting" class="w-full h-full object-cover">
                            </div>
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/Automobile/Karting/karting1.jpg', 'Images/Passions/Automobile/Karting/ligne.png', 'Images/Passions/Automobile/Karting/kartcast.jpg'], 1)">
                                <img src="Images/Passions/Automobile/Karting/ligne.png" alt="Karting" class="w-full h-full object-cover">
                            </div>
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/Automobile/Karting/karting1.jpg', 'Images/Passions/Automobile/Karting/ligne.png', 'Images/Passions/Automobile/Karting/kartcast.jpg'], 2)">
                                <img src="Images/Passions/Automobile/Karting/kartcast.jpg" alt="Karting" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Suivi de la F1</h3>
                    <p class="text-gray-300 mb-4">La F1 attire par son niveau technologique, sa stratégie et l'importance de la donnée dans la performance. Au-delà de la vitesse, tout se joue aussi sur les réglages, les choix d'équipe et l'analyse de course. C'est une discipline complète, où la performance dépend autant de la voiture que de la réflexion autour de la course.</p>
                    <div class="mt-4 bg-black/30 rounded-lg p-4 border border-white/10">
                        <div class="filmstrip">
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/Automobile/passion + f1/f1.png'], 0)">
                                <img src="Images/Passions/Automobile/passion + f1/f1.png" alt="F1" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        
        'passions-mode': `
            <h2 class="text-3xl font-bold mb-6">🕶️ Mode</h2>
            
            <div class="space-y-6">
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Identité & Style</h3>
                    <p class="text-gray-300 mb-4">La mode m'intéresse surtout comme un moyen d'exprimer une image et une personnalité. Ce n'est pas seulement une question de vêtements, mais aussi de style, de cohérence et de manière de se présenter aux autres. J'aime l'idée qu'une tenue puisse refléter une attitude, une identité ou une ambiance particulière, et au-delà de ça, quand on se sent bien dans ce qu'on porte, on se sent aussi mieux tout court. Dans l'immobilier, cette image est importante, parce qu'elle participe à la première impression et à la confiance qu'on inspire.</p>
                    <div class="mt-4 bg-black/30 rounded-lg p-4 border border-white/10">
                        <div class="filmstrip">
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/Mode/Identité & Style/cabine.png'], 0)">
                                <img src="Images/Passions/Mode/Identité & Style/cabine.png" alt="Identité & Style" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Tendances</h3>
                    <p class="text-gray-300 mb-4">Je m'intéresse aussi à l'évolution des tendances et à ce qui rend un style visuellement réussi. Même sans être expert, j'aime remarquer les détails, les associations de pièces et l'équilibre général d'un look. C'est un domaine qui mélange esthétique, créativité et sens du détail.</p>
                    <div class="mt-4 bg-black/30 rounded-lg p-4 border border-white/10">
                        <div class="filmstrip">
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/Mode/Tendances/chaussures.png', 'Images/Passions/Mode/Tendances/galeire.JPG'], 0)">
                                <img src="Images/Passions/Mode/Tendances/chaussures.png" alt="Tendances" class="w-full h-full object-cover">
                            </div>
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/Mode/Tendances/chaussures.png', 'Images/Passions/Mode/Tendances/galeire.JPG'], 1)">
                                <img src="Images/Passions/Mode/Tendances/galeire.JPG" alt="Tendances" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        `,
        
        'passions-photographie': `
            <h2 class="text-3xl font-bold mb-6">📸 Photographie</h2>
            
            <div class="space-y-6">
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Regard, souvenir et image</h3>
                    <p class="text-gray-300 mb-4">La photographie m'intéresse d'abord parce qu'elle permet de garder des souvenirs et de figer des moments importants. En même temps, je pense qu'il faut surtout profiter du moment présent avant de chercher à l'immortaliser. Ce qui me plaît aussi, c'est l'aspect visuel et esthétique : une photo peut transmettre une ambiance, une émotion ou un message, pas seulement montrer une scène. J'aime les images qui restent naturelles, sans trop de retouche, parce qu'elles gardent plus de sincérité et d'authenticité. Dans l'immobilier aussi, l'image compte beaucoup, car une bonne photo permet de valoriser un bien et de donner une première impression plus sérieuse et plus attractive. Aujourd'hui, cet aspect visuel prend aussi beaucoup de place sur les réseaux sociaux, où ici c'est la vidéo qui joue un vrai rôle dans la manière de communiquer et de capter l'attention.</p>
                    <div class="grid grid-cols-3 gap-2 mt-4">
                        <img src="Images/Passions/Photographie/Composition & Lumière/triang.jpg" alt="Photographie" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Photographie/Composition & Lumière/triang.jpg', 'Images/Passions/Photographie/Composition & Lumière/baot.jpeg', 'Images/Passions/Photographie/Composition & Lumière/artgov.jpg'], 0)">
                        <img src="Images/Passions/Photographie/Composition & Lumière/baot.jpeg" alt="Photographie" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Photographie/Composition & Lumière/triang.jpg', 'Images/Passions/Photographie/Composition & Lumière/baot.jpeg', 'Images/Passions/Photographie/Composition & Lumière/artgov.jpg'], 1)">
                        <img src="Images/Passions/Photographie/Composition & Lumière/artgov.jpg" alt="Photographie" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Photographie/Composition & Lumière/triang.jpg', 'Images/Passions/Photographie/Composition & Lumière/baot.jpeg', 'Images/Passions/Photographie/Composition & Lumière/artgov.jpg'], 2)">
                    </div>
                </div>
            </div>
        `,
        
        'passions-cinema': `
            <h2 class="text-3xl font-bold mb-6">🎬 Cinématographie</h2>
            
            <div class="space-y-6">
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Scénario et narration visuelle</h3>
                    <p class="text-gray-300 mb-4">Ce qui me plaît dans le cinéma, c'est la façon de construire un scénario et de faire passer une émotion à travers la narration. Un film crée une progression, des retournements, des révélations, un enchaînement de tensions et une véritable ambiance jusqu'au dénouement. C'est aussi ce qui le rend inspirant, parce qu'il peut influencer la manière dont on perçoit un lieu, une situation ou même une façon de vivre.</p>
                    <div class="mt-4">
                        <img src="Images/Passions/Cinematographie/Storytelling visuel/procchainement.png" alt="Scénario" class="w-full h-48 object-cover rounded-lg cursor-pointer" onclick="openLightbox(['Images/Passions/Cinematographie/Storytelling visuel/procchainement.png'], 0)">
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Mise en scène et travail collectif</h3>
                    <p class="text-gray-300 mb-4">En réalité, un film repose sur un mélange de nombreux éléments : l'image, le montage, les effets spéciaux, le jeu d'acteur, les cascades… Ce qui impressionne, c'est surtout le travail d'équipe qu'il y a derrière, avec des métiers très différents qui doivent tous aller dans le même sens pour créer quelque chose de cohérent et marquant.</p>
                    <div class="mt-4">
                        <img src="Images/Passions/Cinematographie/Mise en scène/cinema - Copie.jpg" alt="Mise en scène" class="w-full h-48 object-cover rounded-lg cursor-pointer" onclick="openLightbox(['Images/Passions/Cinematographie/Mise en scène/cinema - Copie.jpg'], 0)">
                    </div>
                </div>
            </div>
        `,
        
        'passions-cuisine': `
            <h2 class="text-3xl font-bold mb-6">🍳 Cuisine</h2>
            
            <div class="space-y-6">
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Gastronomie & Précision</h3>
                    <p class="text-gray-300 mb-4">On passe une grande partie de notre temps à manger, et la cuisine occupe donc une place essentielle dans le quotidien. Alors on pourrait penser comme Émile dans Ratatouille, avec une vision très simple de la nourriture, mais c'est justement Rémy qui rappelle que savoir cuisiner permet de mieux manger, de maîtriser ce que l'on consomme et de trouver un vrai équilibre entre utilité, santé et plaisir. C'est aussi une compétence concrète qui touche à l'organisation, aux dosages, aux temps de cuisson et à la rigueur, un peu comme une gestion de projet à petite échelle.</p>
                    <div class="mt-4">
                        <img src="Images/Passions/Cuisine/Gastronomie & Précision/platburg.jpg" alt="Gastronomie" class="w-full h-48 object-cover rounded-lg cursor-pointer" onclick="openLightbox(['Images/Passions/Cuisine/Gastronomie & Précision/platburg.jpg'], 0)">
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Dressage et valorisation</h3>
                    <p class="text-gray-300 mb-4">Au-delà du goût, la présentation compte énormément, parce qu'un plat bien dressé donne tout de suite une impression plus soignée et plus qualitative. Le dressage demande du sens du détail, de l'harmonie et une certaine précision dans la manière de valoriser le produit. C'est ce mélange entre technique et esthétique qui rend la cuisine intéressante, car elle repose autant sur la maîtrise que sur le rendu final.</p>
                    <div class="grid grid-cols-2 gap-2 mt-4">
                        <img src="Images/Passions/Cuisine/Art du dressage/suchu.jpg" alt="Dressage" class="w-full h-32 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Cuisine/Art du dressage/suchu.jpg', 'Images/Passions/Cuisine/Art du dressage/mojito.jpg'], 0)">
                        <img src="Images/Passions/Cuisine/Art du dressage/mojito.jpg" alt="Dressage" class="w-full h-32 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Cuisine/Art du dressage/suchu.jpg', 'Images/Passions/Cuisine/Art du dressage/mojito.jpg'], 1)">
                    </div>
                </div>
            </div>
        `,
        
        'passions-musique': `
            <h2 class="text-3xl font-bold mb-6">🎧 Musique</h2>
            
            <div class="space-y-6">
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Piano</h3>
                    <p class="text-gray-300 mb-4">La pratique du piano m'a appris la discipline, la patience et l'exigence. Cet instrument m'a aussi aidé à développer ma concentration et ma rigueur au quotidien.</p>
                    <div class="grid grid-cols-3 gap-2 mt-4">
                        <img src="Images/Passions/Music/piano/piano.PNG" alt="Piano" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Music/piano/piano.PNG', 'Images/Passions/Music/piano/music2.jpeg', 'Images/Passions/Music/piano/pratique.jpeg', 'Images/Passions/Music/piano/music4.jpeg'], 0)">
                        <img src="Images/Passions/Music/piano/music2.jpeg" alt="Piano" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Music/piano/piano.PNG', 'Images/Passions/Music/piano/music2.jpeg', 'Images/Passions/Music/piano/pratique.jpeg', 'Images/Passions/Music/piano/music4.jpeg'], 1)">
                        <img src="Images/Passions/Music/piano/pratique.jpeg" alt="Piano" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Music/piano/piano.PNG', 'Images/Passions/Music/piano/music2.jpeg', 'Images/Passions/Music/piano/pratique.jpeg', 'Images/Passions/Music/piano/music4.jpeg'], 2)">
                        <img src="Images/Passions/Music/piano/music4.jpeg" alt="Piano" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Music/piano/piano.PNG', 'Images/Passions/Music/piano/music2.jpeg', 'Images/Passions/Music/piano/pratique.jpeg', 'Images/Passions/Music/piano/music4.jpeg'], 3)">
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Écoute & Ouverture d'esprit</h3>
                    <p class="text-gray-300 mb-4">J'aime découvrir des styles très variés, ce qui nourrit ma motivation et mon adaptabilité. Cette ouverture musicale me permet d'apprécier des univers différents et d'enrichir ma sensibilité.</p>
                    <div class="grid grid-cols-3 gap-2 mt-4">
                        <img src="Images/Passions/Music/Écoute & Ouverture d'esprit/music8.jpeg" alt="Écoute" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Music/Écoute & Ouverture d'esprit/music8.jpeg', 'Images/Passions/Music/Écoute & Ouverture d'esprit/ecoute_background.jpeg', 'Images/Passions/Music/Écoute & Ouverture d'esprit/music.png', 'Images/Passions/Music/Écoute & Ouverture d'esprit/music9.jpeg'], 0)">
                        <img src="Images/Passions/Music/Écoute & Ouverture d'esprit/ecoute_background.jpeg" alt="Écoute" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Music/Écoute & Ouverture d'esprit/music8.jpeg', 'Images/Passions/Music/Écoute & Ouverture d'esprit/ecoute_background.jpeg', 'Images/Passions/Music/Écoute & Ouverture d'esprit/music.png', 'Images/Passions/Music/Écoute & Ouverture d'esprit/music9.jpeg'], 1)">
                        <img src="Images/Passions/Music/Écoute & Ouverture d'esprit/music.png" alt="Écoute" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Music/Écoute & Ouverture d'esprit/music8.jpeg', 'Images/Passions/Music/Écoute & Ouverture d'esprit/ecoute_background.jpeg', 'Images/Passions/Music/Écoute & Ouverture d'esprit/music.png', 'Images/Passions/Music/Écoute & Ouverture d'esprit/music9.jpeg'], 2)">
                        <img src="Images/Passions/Music/Écoute & Ouverture d'esprit/music9.jpeg" alt="Écoute" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Music/Écoute & Ouverture d'esprit/music8.jpeg', 'Images/Passions/Music/Écoute & Ouverture d'esprit/ecoute_background.jpeg', 'Images/Passions/Music/Écoute & Ouverture d'esprit/music.png', 'Images/Passions/Music/Écoute & Ouverture d'esprit/music9.jpeg'], 3)">
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Concerts & Événements</h3>
                    <p class="text-gray-300 mb-4">Les concerts et les événements musicaux offrent des moments d'immersion forts et collectifs. J'aime cette dimension humaine, où la musique devient un sens du partage et une expérience partagée et marquante.</p>
                    <div class="grid grid-cols-2 gap-2 mt-4">
                        <img src="Images/Passions/Music/Concerts & Événements/micro.JPG" alt="Concerts" class="w-full h-32 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Music/Concerts & Événements/micro.JPG', 'Images/Passions/Music/Concerts & Événements/concert.png'], 0)">
                        <img src="Images/Passions/Music/Concerts & Événements/concert.png" alt="Concerts" class="w-full h-32 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Music/Concerts & Événements/micro.JPG', 'Images/Passions/Music/Concerts & Événements/concert.png'], 1)">
                    </div>
                </div>
            </div>
        `,
        
        'passions-mer': `
            <h2 class="text-3xl font-bold mb-6">🌊 Mer Nature</h2>
            
            <div class="space-y-6">
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Un cadre de vie inspirant</h3>
                    <p class="text-gray-300 mb-4">J'ai grandi dans le sud, dans un environnement privilégié entre la mer, les plages, les calanques et la montagne. J'ai aussi vécu l'an dernier sur le campus de Luminy, un lieu entouré d'une nature remarquable, ce qui a renforcé mon attachement à ces paysages.</p>
                    <div class="grid grid-cols-3 gap-2 mt-4">
                        <img src="Images/Passions/Mer Nature/Écosystèmes marins/aqua.png" alt="Mer" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Mer Nature/Écosystèmes marins/aqua.png', 'Images/Passions/Mer Nature/Écosystèmes marins/creature.png', 'Images/Passions/Mer Nature/Écosystèmes marins/etoile.png'], 0)">
                        <img src="Images/Passions/Mer Nature/Écosystèmes marins/creature.png" alt="Mer" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Mer Nature/Écosystèmes marins/aqua.png', 'Images/Passions/Mer Nature/Écosystèmes marins/creature.png', 'Images/Passions/Mer Nature/Écosystèmes marins/etoile.png'], 1)">
                        <img src="Images/Passions/Mer Nature/Écosystèmes marins/etoile.png" alt="Mer" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Mer Nature/Écosystèmes marins/aqua.png', 'Images/Passions/Mer Nature/Écosystèmes marins/creature.png', 'Images/Passions/Mer Nature/Écosystèmes marins/etoile.png'], 2)">
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Ressourcement</h3>
                    <p class="text-gray-300 mb-4">Je pense qu'on a tous besoin, à un moment ou à un autre, de se reconnecter à la nature. Que ce soit pour marcher, prendre l'air, voir la mer ou aller en montagne, ça fait du bien et ça permet de couper un peu du rythme du quotidien. En voyage aussi, découvrir de nouveaux paysages et des endroits impressionnants reste quelque chose de fort, parce que ça marque et ça laisse des souvenirs.</p>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
                        <img src="Images/Passions/Mer Nature/Ressourcement/yatch.png" alt="Ressourcement" class="w-full h-20 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Mer Nature/Ressourcement/yatch.png', 'Images/Passions/Mer Nature/Ressourcement/sttrop.png', 'Images/Passions/Mer Nature/Ressourcement/bois.png', 'Images/Passions/Mer Nature/Ressourcement/mouette.JPG', 'Images/Passions/Mer Nature/Ressourcement/montagne.png'], 0)">
                        <img src="Images/Passions/Mer Nature/Ressourcement/sttrop.png" alt="Ressourcement" class="w-full h-20 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Mer Nature/Ressourcement/yatch.png', 'Images/Passions/Mer Nature/Ressourcement/sttrop.png', 'Images/Passions/Mer Nature/Ressourcement/bois.png', 'Images/Passions/Mer Nature/Ressourcement/mouette.JPG', 'Images/Passions/Mer Nature/Ressourcement/montagne.png'], 1)">
                        <img src="Images/Passions/Mer Nature/Ressourcement/bois.png" alt="Ressourcement" class="w-full h-20 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Mer Nature/Ressourcement/yatch.png', 'Images/Passions/Mer Nature/Ressourcement/sttrop.png', 'Images/Passions/Mer Nature/Ressourcement/bois.png', 'Images/Passions/Mer Nature/Ressourcement/mouette.JPG', 'Images/Passions/Mer Nature/Ressourcement/montagne.png'], 2)">
                        <img src="Images/Passions/Mer Nature/Ressourcement/mouette.JPG" alt="Ressourcement" class="w-full h-20 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Mer Nature/Ressourcement/yatch.png', 'Images/Passions/Mer Nature/Ressourcement/sttrop.png', 'Images/Passions/Mer Nature/Ressourcement/bois.png', 'Images/Passions/Mer Nature/Ressourcement/mouette.JPG', 'Images/Passions/Mer Nature/Ressourcement/montagne.png'], 3)">
                        <img src="Images/Passions/Mer Nature/Ressourcement/montagne.png" alt="Ressourcement" class="w-full h-20 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Mer Nature/Ressourcement/yatch.png', 'Images/Passions/Mer Nature/Ressourcement/sttrop.png', 'Images/Passions/Mer Nature/Ressourcement/bois.png', 'Images/Passions/Mer Nature/Ressourcement/mouette.JPG', 'Images/Passions/Mer Nature/Ressourcement/montagne.png'], 4)">
                    </div>
                </div>
            </div>
        `,
        
        'passions-sensations': `
            <h2 class="text-3xl font-bold mb-6">⚡ Sensations Fortes</h2>
            
            <div class="space-y-6">
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Attractions</h3>
                    <p class="text-gray-300 mb-4">Les parcs d'attractions procurent des sensations fortes. Il y a tout un côté technique derrière les roller coasters entre les différents types de parcours, les loopings, les descentes et les enchaînements, il y a vraiment quelque chose d'intéressant dans la manière dont elles sont construites.</p>
                    <div class="grid grid-cols-2 gap-2 mt-4">
                        <img src="Images/Passions/Sensations fortes/attraction/italie.jpg" alt="Attractions" class="w-full h-32 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Sensations fortes/attraction/italie.jpg', 'Images/Passions/Sensations fortes/attraction/tourterrer.jpg'], 0)">
                        <img src="Images/Passions/Sensations fortes/attraction/tourterrer.jpg" alt="Attractions" class="w-full h-32 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Sensations fortes/attraction/italie.jpg', 'Images/Passions/Sensations fortes/attraction/tourterrer.jpg'], 1)">
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Saut en parachute (Tallard)</h3>
                    <p class="text-gray-300 mb-4">J'ai eu la chance de faire un saut en parachute à Tallard, et j'ai adoré cette expérience. Un vrai moment de plaisir et d'adrénaline, avec des sensations assez folles du début à la fin.</p>
                    <div class="grid grid-cols-3 gap-2 mt-4">
                        <img src="Images/Passions/Sensations fortes/Saut Parachute/para.PNG" alt="Parachute" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Sensations fortes/Saut Parachute/para.PNG', 'Images/Passions/Sensations fortes/Saut Parachute/deploiement.JPG', 'Images/Passions/Sensations fortes/Saut Parachute/saut.JPG'], 0)">
                        <img src="Images/Passions/Sensations fortes/Saut Parachute/deploiement.JPG" alt="Parachute" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Sensations fortes/Saut Parachute/para.PNG', 'Images/Passions/Sensations fortes/Saut Parachute/deploiement.JPG', 'Images/Passions/Sensations fortes/Saut Parachute/saut.JPG'], 1)">
                        <img src="Images/Passions/Sensations fortes/Saut Parachute/saut.JPG" alt="Parachute" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Sensations fortes/Saut Parachute/para.PNG', 'Images/Passions/Sensations fortes/Saut Parachute/deploiement.JPG', 'Images/Passions/Sensations fortes/Saut Parachute/saut.JPG'], 2)">
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Exploration Urbaine (Patrimoine Oublié)</h3>
                    <p class="text-gray-300 mb-4">Permet de découvrir l'âme des bâtiments délaissés. Ce que j'aime, c'est l'atmosphère particulière de ces endroits et le fait qu'ils racontent encore quelque chose, même s'ils sont délaissés.</p>
                    <div class="grid grid-cols-3 gap-2 mt-4">
                        <img src="Images/Passions/Sensations fortes/Urbex/mousse.png" alt="Urbex" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Sensations fortes/Urbex/mousse.png', 'Images/Passions/Sensations fortes/Urbex/piscine.jpg', 'Images/Passions/Sensations fortes/Urbex/plongeoir.jpg'], 0)">
                        <img src="Images/Passions/Sensations fortes/Urbex/piscine.jpg" alt="Urbex" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Sensations fortes/Urbex/mousse.png', 'Images/Passions/Sensations fortes/Urbex/piscine.jpg', 'Images/Passions/Sensations fortes/Urbex/plongeoir.jpg'], 1)">
                        <img src="Images/Passions/Sensations fortes/Urbex/plongeoir.jpg" alt="Urbex" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Sensations fortes/Urbex/mousse.png', 'Images/Passions/Sensations fortes/Urbex/piscine.jpg', 'Images/Passions/Sensations fortes/Urbex/plongeoir.jpg'], 2)">
                    </div>
                </div>
            </div>
        `,
        
        // Compétences
        'competences-savoir': `
            <h2 class="text-3xl font-bold mb-6">🧠 Mon Savoir-Être & Savoir-Faire</h2>
            <div class="space-y-6">
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Savoir-être (Soft Skills)</h3>
                    <p class="text-gray-300 mb-4">Sens des responsabilités & Travail en équipe - Acquis lors de mes expériences en animation (BAFA) et en restauration (McDo) où la réussite du groupe dépend de l'engagement individuel.</p>
                    <p class="text-gray-300 mb-4">Curiosité & Motivation - Preuve : Ma capacité à m'auto-former sur des sujets complexes (Cyber, Architecture, Économie) au-delà de mes cours obligatoires.</p>
                    <p class="text-gray-300">Gestion du stress - Preuve : Sang-froid maintenu lors des rushs en service ou lors de situations d'urgence en encadrement de mineurs.</p>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Savoir-faire (Hard Skills)</h3>
                    <p class="text-gray-300 mb-4">Relation Client & Animation - Maîtrise du contact direct, de l'écoute active et de la capacité à captiver un public (enfants comme prospects immobiliers).</p>
                    <p class="text-gray-300 mb-4">Organisation & Priorisation - Gestion simultanée de mes études, de mon travail et de mes projets personnels (CRM, Portfolio).</p>
                    <p class="text-gray-300">Adaptabilité & Réactivité - Passage fluide d'un univers technique (BUT R&T) à un univers commercial (BTS PI) avec une montée en compétence rapide.</p>
                </div>
            </div>
        `,
        
        'competences-certifications': `
            <h2 class="text-3xl font-bold mb-6">📜 Certifications & Diplômes Officiels</h2>
            <div class="space-y-6">
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 BAFA (Brevet d'Aptitude aux Fonctions d'Animateur)</h3>
                    <p class="text-gray-300 mb-4">Validé 3/3 avec Approfondissement "Théâtre"</p>
                    <p class="text-blue-400">🎯 Expertise : Gestion de groupe, sécurité des mineurs, et surtout aisance à l'oral grâce à l'option théâtre (utile pour les prises de parole en public et la négociation).</p>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 BIA (Brevet d'Initiation Aéronautique)</h3>
                    <p class="text-gray-300 mb-4">Obtenu en classe de Seconde</p>
                    <p class="text-blue-400">🎯 Bases solides en aérodynamique, météo et navigation. Témoigne d'une passion pour la précision et la rigueur aéronautique depuis le plus jeune âge.</p>
                    <div class="mt-4">
                        <img src="Images/Compétences/Certifications/BIA/Avion.JPG" alt="BIA" class="w-full h-48 object-cover rounded-lg">
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Permis de Conduire (Permis B)</h3>
                    <p class="text-gray-300 mb-4">Mobilité Totale</p>
                    <p class="text-blue-400">🎯 Indispensable pour la prospection de terrain et les visites immobilières sur les secteurs du Var et des Bouches-du-Rhône.</p>
                    <div class="mt-4">
                        <img src="Images/Compétences/Certifications/permis/permis.jpg" alt="Permis" class="w-full h-48 object-cover rounded-lg">
                    </div>
                </div>
            </div>
        `,
        
        // Explorations
        'explorations-immobilier': `
            <h2 class="text-3xl font-bold mb-6">📊 Immobilier & Marché</h2>
            <div class="space-y-6">
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🎯 L'impact des taux (2024-2026)</h3>
                    <p class="text-gray-300 mb-4">Objectif : Analyser la corrélation entre les taux de la BCE et le pouvoir d'achat immobilier.</p>
                    <p class="text-blue-400">🧠 Ce qu'il faut retenir : Une hausse de 1% des taux réduit la capacité d'emprunt d'environ 10%.</p>
                    <p class="text-gray-300 mb-4">📊 Exemple : Comparatif de mensualités pour un prêt de 200 000€ entre 2021 et 2026.</p>
                    <div class="mt-4">
                        <a href="Cours/analyse_taux.pdf" target="_blank" class="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                            <i data-lucide="file-text" class="w-4 h-4 mr-2"></i>
                            CONSULTER L'ANALYSE COMPLÈTE (PDF)
                        </a>
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🎯 Analyse de Rentabilité</h3>
                    <p class="text-gray-300 mb-4">Objectif : Déterminer la viabilité financière d'un investissement locatif.</p>
                    <p class="text-blue-400">🧠 Ce qu'il faut retenir : Toujours soustraire la taxe foncière, les charges non récupérables et la vacance locative du rendement brut.</p>
                    <p class="text-gray-300 mb-4">🛠️ Ressource : Accès à mon tableur d'aide à la décision.</p>
                    <div class="mt-4">
                        <a href="Cours/simulateur_rentabilite.xlsx" target="_blank" class="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                            <i data-lucide="calculator" class="w-4 h-4 mr-2"></i>
                            TÉLÉCHARGER LE SIMULATEUR (EXCEL)
                        </a>
                    </div>
                </div>
            </div>
        `,
        
        'explorations-tech': `
            <h2 class="text-3xl font-bold mb-6">🛡️ Tech & Cybersécurité</h2>
            <div class="space-y-6">
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🎯 Organisation SOC / CERT</h3>
                    <p class="text-gray-300 mb-4">Objectif : Comprendre la structure de défense d'une infrastructure critique.</p>
                    <p class="text-blue-400">🧠 Ce qu'il faut retenir : Le SOC détecte les menaces (préventif), le CERT intervient en cas d'incident (curatif).</p>
                    <p class="text-gray-300 mb-4">💡 Application : Pourquoi la cybersécurité est le nouvel enjeu majeur de la gestion de données clients.</p>
                    <div class="mt-4">
                        <a href="Cours/cyber_soc_cert.pdf" target="_blank" class="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                            <i data-lucide="shield" class="w-4 h-4 mr-2"></i>
                            ACCÉDER AU DOSSIER CYBER (NOTION)
                        </a>
                    </div>
                </div>
            </div>
        `,
        
        'explorations-societe': `
            <h2 class="text-3xl font-bold mb-6">🌍 Enjeux de Société</h2>
            <div class="space-y-6">
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🎯 Géographie : le droit à la mer</h3>
                    <p class="text-gray-300 mb-4">Ce dossier m'intéresse parce qu'il montre comment la mer peut être à la fois un espace de circulation, de rivalités et de protection.</p>
                    <div class="mt-4">
                        <a href="Cours/droit_a_la_mer.pdf" target="_blank" class="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                            <i data-lucide="file-text" class="w-4 h-4 mr-2"></i>
                            ACCÉDER AU DOSSIER PDF
                        </a>
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🎯 Le détroit de Malacca : la méthodologie du croquis.</h3>
                    <p class="text-gray-300 mb-4">Comment traduire la complexité d'un point névralgique mondial en un dessin simplifié ?</p>
                    <div class="mt-4">
                        <a href="Cours/GÉOGRAPHIE LA MÉTHODOLOGIE DU CROQUIS.pdf" target="_blank" class="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                            <i data-lucide="map" class="w-4 h-4 mr-2"></i>
                            ACCÉDER À LA MÉTHODOLOGIE (GÉOGRAPHIE)
                        </a>
                    </div>
                </div>
            </div>
        `,
        
        'explorations-performance': `
            <h2 class="text-3xl font-bold mb-6">🏎️ Performance & Technique</h2>
            <div class="space-y-6">
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🎯 Pilotage & Aéronautique (BIA)</h3>
                    <p class="text-gray-300 mb-4">Objectif : Transposer la rigueur aéronautique au monde des affaires.</p>
                    <p class="text-blue-400">🧠 Ce qu'il faut retenir : La culture de la "Check-list" et du sang-froid en situation critique.</p>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🎯 Photographie & Rendu Visuel</h3>
                    <p class="text-gray-300 mb-4">Objectif : Maîtriser l'image pour valoriser un actif immobilier.</p>
                    <p class="text-blue-400">🧠 Ce qu'il faut retenir : Gestion de la lumière naturelle et cadrage aux points de force.</p>
                </div>
            </div>
        `,
        
        'explorations-psycho': `
            <h2 class="text-3xl font-bold mb-6">🧠 Psycho</h2>
            <div class="space-y-6">
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🎯 PSYCHANALYSE DE L'ART : LA SUBLIMATION</h3>
                    <p class="text-gray-300 mb-4">Pourquoi créons-nous ? Ce dossier synthétise les théories freudiennes appliquées à l'esthétique.</p>
                    <div class="mt-4">
                        <a href="Cours/Analyse de Freud _ L'Art et la Fantaisie.pdf" target="_blank" class="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                            <i data-lucide="brain" class="w-4 h-4 mr-2"></i>
                            ACCÉDER À L'ANALYSE
                        </a>
                    </div>
                </div>
            </div>
        `,
        
        'explorations-autres': `
            <h2 class="text-3xl font-bold mb-6">📂 Autres</h2>
            <div class="space-y-6">
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">📐 MATHÉMATIQUES : OUTIL DE VIE OU PERTE DE TEMPS ?</h3>
                    <p class="text-gray-300 mb-4">Ce dossier interroge le paradoxe de l'enseignement des mathématiques : pourquoi passer des années à étudier l'abstraction alors que peu d'adultes utilisent les dérivées au quotidien ? J'ai synthétisé les enjeux entre "musculation de l'esprit" et nécessité de préparer les élèves à la réalité administrative et financière.</p>
                    <div class="mt-4">
                        <a href="Cours/Les Mathématiques Scolaires.pdf" target="_blank" class="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                            <i data-lucide="calculator" class="w-4 h-4 mr-2"></i>
                            ACCÉDER À LA RÉFLEXION
                        </a>
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">📝 L'art du Slang : décoder les abréviations anglaises</h3>
                    <p class="text-gray-300 mb-4">Comment une suite de lettres peut-elle devenir un langage universel ? Ce dossier explore les codes de la communication moderne, des réseaux sociaux aux milieux professionnels, pour comprendre comment l'anglais s'adapte à l'urgence de l'instantanéité. J'y analyse les structures logiques de l'argot internet, la hiérarchie des émotions à travers le rire et les nuances indispensables pour éviter les erreurs de contexte.</p>
                    <div class="mt-4">
                        <a href="Cours/Abréviations Anglaises.pdf" target="_blank" class="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                            <i data-lucide="file-text" class="w-4 h-4 mr-2"></i>
                            ACCÉDER AU GUIDE
                        </a>
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🎨 DANGEROUS : L'Art de la Cover de Michael Jackson</h3>
                    <p class="text-gray-300 mb-4">Peut-on transformer une pochette d'album en un manifeste du Pop Surréalisme ? Ce dossier analyse l'œuvre monumentale de Mark Ryden pour l'album Dangerous, réalisée entièrement à la main sur une période de six mois. J'y explore la fusion entre icônes de la pop culture et références classiques — comme l'hommage au Napoléon d'Ingres — pour décrypter comment chaque détail peint à l'acrylique raconte la solitude et le génie du "King of Pop".</p>
                    <div class="mt-4">
                        <a href="Cours/DANGEROUS L'Art du Cover de Michael Jackson.pdf" target="_blank" class="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                            <i data-lucide="image" class="w-4 h-4 mr-2"></i>
                            ACCÉDER À L'ANALYSE VISUELLE
                        </a>
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🎪 Le Cirque en fête : concevoir des projets d'animation</h3>
                    <p class="text-gray-300 mb-4">Comment transformer un simple après-midi en une expérience immersive sous le grand chapiteau ? Ce guide pédagogique structure une progression d'activités adaptées au développement de l'enfant, de l'éveil de l'imaginaire chez les 3-5 ans à la maîtrise technique des arts du cirque pour les plus grands. J'y détaille des ateliers variés — jonglage, parcours d'équilibre et création de masques — tout en mettant l'accent sur le rôle crucial de l'animateur dans la mise en scène et la sécurité des pratiquants.</p>
                    <div class="mt-4">
                        <a href="Cours/Guide de l'Animateur: Activités et Grands Jeux sur le Thème du Cirque.pdf" target="_blank" class="inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors">
                            <i data-lucide="users" class="w-4 h-4 mr-2"></i>
                            ACCÉDER AU GUIDE
                        </a>
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🇺🇸 Libertés et Tensions : Une Histoire des États-Unis</h3>
                    <p class="text-gray-300 mb-4">Comment concilier les idéaux de liberté d'expression avec les réalités brutales de la lutte pour les droits civiques et la Guerre froide ? Ce dossier bilingue explore les fondements de la démocratie américaine, du Premier Amendement de 1791 — pilier de la liberté de religion, de presse et de parole — jusqu'aux défis modernes posés par la désinformation. J'y analyse également l'ère Kennedy comme un tournant historique, marquant la volonté de réformer les institutions fédérales et de mettre fin à la ségrégation raciale dans un climat de tension politique extrême.</p>
                    <div class="mt-4">
                        <a href="Cours/Histoire et Libertés aux États-Unis.pdf" target="_blank" class="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                            <i data-lucide="globe" class="w-4 h-4 mr-2"></i>
                            ACCÉDER AU DOSSIER
                        </a>
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">📊 Maîtriser la Veille Stratégique : Outils et Analyse de Marché</h3>
                    <p class="text-gray-300 mb-4">Comment rester compétitif dans un secteur immobilier en constante mutation ? Ce dossier complet synthétise les mécanismes de la veille informationnelle, de l'automatisation par flux RSS aux méthodes "Push & Pull", essentielles pour anticiper les évolutions du marché. J'y analyse également l'impact concret de la hausse des taux d'intérêt depuis 2022 sur le pouvoir d'achat des acquéreurs et la nécessité pour les agences d'adapter leur expertise et leur prospection face à un marché ralenti.</p>
                    <div class="mt-4">
                        <a href="Cours/La Veille Immobilière.pdf" target="_blank" class="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                            <i data-lucide="trending-up" class="w-4 h-4 mr-2"></i>
                            ACCÉDER À LA PRÉSENTATION
                        </a>
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🏛️ Urbanisme en Zone Protégée : Analyse et Régularisation du Bâti</h3>
                    <p class="text-gray-300 mb-4">Comment gérer un bien comportant des constructions non autorisées en zone agricole ? Cette note de synthèse détaille les enjeux juridiques liés aux constructions sans permis dans le secteur de Lascours (Roquevaire), classé en zone A2 (Zones agricoles classiques). J'y explore les mécanismes de la prescription pénale de 6 ans et de la prescription administrative de 10 ans, tout en soulignant l'importance du devoir de conseil face aux risques d'assurance et de dépréciation du bien lors de la commercialisation. Ce dossier constitue une étude de cas pratique sur la conciliation entre activité agricole et lutte contre le mitage de l'espace.</p>
                    <div class="mt-4">
                        <a href="Cours/Note de synthèse Evan.pdf" target="_blank" class="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                            <i data-lucide="file-text" class="w-4 h-4 mr-2"></i>
                            ACCÉDER À LA NOTE DE SYNTHÈSE
                        </a>
                    </div>
                </div>
            </div>
        `,
        
        // Passions complètes avec tout le contenu détaillé
        'passions-sports': `
            <h2 class="text-3xl font-bold mb-6">🏃 Sports</h2>
            
            <div class="space-y-6">
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Musculation</h3>
                    <p class="text-gray-300 mb-4">J'aime le côté progression, discipline et objectifs à atteindre petit à petit. C'est un sport qui montre bien l'importance de l'effort régulier pour obtenir des résultats. Pendant mon année à Luminy, j'ai aussi découvert la calisthénie, et j'ai trouvé le fait de travailler pour "débloquer" des figures (front lever, planche, handstand) vraiment intéressant ; Ça demande de vraiment maîtriser son corps, son équilibre et sa coordination.</p>
                    <div class="mt-4 bg-black/30 rounded-lg p-4 border border-white/10">
                        <div class="filmstrip">
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/sports/muscu/musculation9.jpeg', 'Images/Passions/sports/muscu/musculation6.jpeg', 'Images/Passions/sports/muscu/musculation_background.jpeg'], 0)">
                                <img src="Images/Passions/sports/muscu/musculation9.jpeg" alt="Musculation" class="w-full h-full object-cover">
                            </div>
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/sports/muscu/musculation9.jpeg', 'Images/Passions/sports/muscu/musculation6.jpeg', 'Images/Passions/sports/muscu/musculation_background.jpeg'], 1)">
                                <img src="Images/Passions/sports/muscu/musculation6.jpeg" alt="Musculation" class="w-full h-full object-cover">
                            </div>
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/sports/muscu/musculation9.jpeg', 'Images/Passions/sports/muscu/musculation6.jpeg', 'Images/Passions/sports/muscu/musculation_background.jpeg'], 2)">
                                <img src="Images/Passions/sports/muscu/musculation_background.jpeg" alt="Musculation" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Ski</h3>
                    <p class="text-gray-300 mb-4">C'est un sport que j'ai eu la chance de commencer jeune, et aujourd'hui j'ai un bon niveau qui me permet de vraiment me faire plaisir et d'être plus libre dans ma pratique. J'aime la vitesse, mais surtout le style, les beaux mouvements et les sensations que ça procure. Et honnêtement, la poudreuse, c'est ce que je préfère : il y a une vraie sensation de flotter avec une impression de légèreté et de liberté que je retrouve rarement ailleurs.</p>
                    <div class="mt-4 bg-black/30 rounded-lg p-4 border border-white/10">
                        <div class="filmstrip">
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/sports/ski/ski_background.jpeg'], 0)">
                                <img src="Images/Passions/sports/ski/ski_background.jpeg" alt="Ski" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 VTT</h3>
                    <p class="text-gray-300 mb-4">J'en ai fait pendant 2 ans en club, et j'aime encore en refaire de temps en temps. Ce que j'aime dans ce sport, c'est qu'il fait travailler à la fois les muscles, l'endurance et la technique. Il y a aussi de vraies sensations dans les singles, où il faut rester concentré et réactif. C'est un sport qui me plaît parce qu'il mélange effort, plaisir et sensations fortes.</p>
                    <div class="mt-4 bg-black/30 rounded-lg p-4 border border-white/10">
                        <div class="filmstrip">
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/sports/vtt/boue.png', 'Images/Passions/sports/vtt/tramplin.JPG', 'Images/Passions/sports/vtt/velo8.jpeg', 'Images/Passions/sports/vtt/velo_background.jpeg'], 0)">
                                <img src="Images/Passions/sports/vtt/boue.png" alt="VTT" class="w-full h-full object-cover">
                            </div>
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/sports/vtt/boue.png', 'Images/Passions/sports/vtt/tramplin.JPG', 'Images/Passions/sports/vtt/velo8.jpeg', 'Images/Passions/sports/vtt/velo_background.jpeg'], 1)">
                                <img src="Images/Passions/sports/vtt/tramplin.JPG" alt="VTT" class="w-full h-full object-cover">
                            </div>
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/sports/vtt/boue.png', 'Images/Passions/sports/vtt/tramplin.JPG', 'Images/Passions/sports/vtt/velo8.jpeg', 'Images/Passions/sports/vtt/velo_background.jpeg'], 2)">
                                <img src="Images/Passions/sports/vtt/velo8.jpeg" alt="VTT" class="w-full h-full object-cover">
                            </div>
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/sports/vtt/boue.png', 'Images/Passions/sports/vtt/tramplin.JPG', 'Images/Passions/sports/vtt/velo8.jpeg', 'Images/Passions/sports/vtt/velo_background.jpeg'], 3)">
                                <img src="Images/Passions/sports/vtt/velo_background.jpeg" alt="VTT" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Course à pied</h3>
                    <p class="text-gray-300 mb-4">La course à pied aide beaucoup à travailler le souffle, l'endurance et surtout le mental. C'est une activité qui apprend à tenir dans la durée, à rester régulier et à ne pas lâcher quand c'est plus difficile. Elle développe une vraie persévérance, utile aussi dans les projets de longue durée.</p>
                    <div class="mt-4 bg-black/30 rounded-lg p-4 border border-white/10">
                        <div class="filmstrip">
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/sports/course/course_background.jpeg'], 0)">
                                <img src="Images/Passions/sports/course/course_background.jpeg" alt="Course" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Randonnée</h3>
                    <p class="text-gray-300 mb-4">C'est une vraie occasion de prendre du recul, de souffler un peu et de profiter pleinement de ce qui nous entoure. De plus On vit dans une région qui offre de superbes parcours, entre calanques, Sainte-Baume, Verdon, les sentiers vers Saint-Tropez….</p>
                    <div class="mt-4 bg-black/30 rounded-lg p-4 border border-white/10">
                        <div class="filmstrip">
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/sports/Rando/sttrop.JPG'], 0)">
                                <img src="Images/Passions/sports/Rando/sttrop.JPG" alt="Randonnée" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        
        'passions-automobile': `
            <h2 class="text-3xl font-bold mb-6">🏎️ Automobile</h2>
            
            <div class="space-y-6">
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Événements (GT4, GP Historique Le Castellet)</h3>
                    <p class="text-gray-300 mb-4">Les événements automobiles permettent de voir de près l'élite du sport auto, en GT4, au Grand Prix Historique… Notamment avec le Castellet à proximité. Certains sont aussi très accessibles, parfois peu chers voire gratuits, car moins médiatisés que la F1. Pourtant, l'expérience reste incroyable, avec une vraie proximité des voitures, des équipes et l'ambiance du paddock. C'est une autre manière de vivre le sport auto, plus accessible mais tout aussi immersive.</p>
                    <div class="mt-4 bg-black/30 rounded-lg p-4 border border-white/10">
                        <div class="filmstrip">
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/Automobile/evenement/evenements.jpg', 'Images/Passions/Automobile/evenement/cocpite.jpg', 'Images/Passions/Automobile/evenement/garage.jpg', 'Images/Passions/Automobile/evenement/paul.jpg', 'Images/Passions/Automobile/evenement/rasso.PNG'], 0)">
                                <img src="Images/Passions/Automobile/evenement/evenements.jpg" alt="Événements" class="w-full h-full object-cover">
                            </div>
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/Automobile/evenement/evenements.jpg', 'Images/Passions/Automobile/evenement/cocpite.jpg', 'Images/Passions/Automobile/evenement/garage.jpg', 'Images/Passions/Automobile/evenement/paul.jpg', 'Images/Passions/Automobile/evenement/rasso.PNG'], 1)">
                                <img src="Images/Passions/Automobile/evenement/cocpite.jpg" alt="Événements" class="w-full h-full object-cover">
                            </div>
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/Automobile/evenement/evenements.jpg', 'Images/Passions/Automobile/evenement/cocpite.jpg', 'Images/Passions/Automobile/evenement/garage.jpg', 'Images/Passions/Automobile/evenement/paul.jpg', 'Images/Passions/Automobile/evenement/rasso.PNG'], 2)">
                                <img src="Images/Passions/Automobile/evenement/garage.jpg" alt="Événements" class="w-full h-full object-cover">
                            </div>
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/Automobile/evenement/evenements.jpg', 'Images/Passions/Automobile/evenement/cocpite.jpg', 'Images/Passions/Automobile/evenement/garage.jpg', 'Images/Passions/Automobile/evenement/paul.jpg', 'Images/Passions/Automobile/evenement/rasso.PNG'], 3)">
                                <img src="Images/Passions/Automobile/evenement/paul.jpg" alt="Événements" class="w-full h-full object-cover">
                            </div>
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/Automobile/evenement/evenements.jpg', 'Images/Passions/Automobile/evenement/cocpite.jpg', 'Images/Passions/Automobile/evenement/garage.jpg', 'Images/Passions/Automobile/evenement/paul.jpg', 'Images/Passions/Automobile/evenement/rasso.PNG'], 4)">
                                <img src="Images/Passions/Automobile/evenement/rasso.PNG" alt="Événements" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Karting</h3>
                    <p class="text-gray-300 mb-4">Le karting, c'est souvent par-là que commencent tous les pilotes pros. On ressent vraiment les sensations de pilotage, dans les virages comme dans les phases d'accélération, et c'est intéressant de pouvoir tester différents circuits. En plus, on a la chance d'en avoir de très bons aux alentours. C'est une bonne école pour développer les bases du pilotage (trajectoires, freinage, point de corde), ses réflexes et son sang-froid.</p>
                    <div class="mt-4 bg-black/30 rounded-lg p-4 border border-white/10">
                        <div class="filmstrip">
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/Automobile/Karting/karting1.jpg', 'Images/Passions/Automobile/Karting/ligne.png', 'Images/Passions/Automobile/Karting/kartcast.jpg'], 0)">
                                <img src="Images/Passions/Automobile/Karting/karting1.jpg" alt="Karting" class="w-full h-full object-cover">
                            </div>
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/Automobile/Karting/karting1.jpg', 'Images/Passions/Automobile/Karting/ligne.png', 'Images/Passions/Automobile/Karting/kartcast.jpg'], 1)">
                                <img src="Images/Passions/Automobile/Karting/ligne.png" alt="Karting" class="w-full h-full object-cover">
                            </div>
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/Automobile/Karting/karting1.jpg', 'Images/Passions/Automobile/Karting/ligne.png', 'Images/Passions/Automobile/Karting/kartcast.jpg'], 2)">
                                <img src="Images/Passions/Automobile/Karting/kartcast.jpg" alt="Karting" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Suivi de la F1</h3>
                    <p class="text-gray-300 mb-4">La F1 attire par son niveau technologique, sa stratégie et l'importance de la donnée dans la performance. Au-delà de la vitesse, tout se joue aussi sur les réglages, les choix d'équipe et l'analyse de course. C'est une discipline complète, où la performance dépend autant de la voiture que de la réflexion autour de la course.</p>
                    <div class="mt-4 bg-black/30 rounded-lg p-4 border border-white/10">
                        <div class="filmstrip">
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/Automobile/passion + f1/f1.png'], 0)">
                                <img src="Images/Passions/Automobile/passion + f1/f1.png" alt="F1" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        
        'passions-mode': `
            <h2 class="text-3xl font-bold mb-6">🕶️ Mode</h2>
            
            <div class="space-y-6">
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Identité & Style</h3>
                    <p class="text-gray-300 mb-4">La mode m'intéresse surtout comme un moyen d'exprimer une image et une personnalité. Ce n'est pas seulement une question de vêtements, mais aussi de style, de cohérence et de manière de se présenter aux autres. J'aime l'idée qu'une tenue puisse refléter une attitude, une identité ou une ambiance particulière, et au-delà de ça, quand on se sent bien dans ce qu'on porte, on se sent aussi mieux tout court. Dans l'immobilier, cette image est importante, parce qu'elle participe à la première impression et à la confiance qu'on inspire.</p>
                    <div class="mt-4 bg-black/30 rounded-lg p-4 border border-white/10">
                        <div class="filmstrip">
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/Mode/Identité & Style/cabine.png'], 0)">
                                <img src="Images/Passions/Mode/Identité & Style/cabine.png" alt="Identité & Style" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Tendances</h3>
                    <p class="text-gray-300 mb-4">Je m'intéresse aussi à l'évolution des tendances et à ce qui rend un style visuellement réussi. Même sans être expert, j'aime remarquer les détails, les associations de pièces et l'équilibre général d'un look. C'est un domaine qui mélange esthétique, créativité et sens du détail.</p>
                    <div class="mt-4 bg-black/30 rounded-lg p-4 border border-white/10">
                        <div class="filmstrip">
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/Mode/Tendances/chaussures.png', 'Images/Passions/Mode/Tendances/galeire.JPG'], 0)">
                                <img src="Images/Passions/Mode/Tendances/chaussures.png" alt="Tendances" class="w-full h-full object-cover">
                            </div>
                            <div class="filmstrip-item cursor-pointer" onclick="openLightbox(['Images/Passions/Mode/Tendances/chaussures.png', 'Images/Passions/Mode/Tendances/galeire.JPG'], 1)">
                                <img src="Images/Passions/Mode/Tendances/galeire.JPG" alt="Tendances" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        `,
        
        'passions-photographie': `
            <h2 class="text-3xl font-bold mb-6">📸 Photographie</h2>
            
            <div class="space-y-6">
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Regard, souvenir et image</h3>
                    <p class="text-gray-300 mb-4">La photographie m'intéresse d'abord parce qu'elle permet de garder des souvenirs et de figer des moments importants. En même temps, je pense qu'il faut surtout profiter du moment présent avant de chercher à l'immortaliser. Ce qui me plaît aussi, c'est l'aspect visuel et esthétique : une photo peut transmettre une ambiance, une émotion ou un message, pas seulement montrer une scène. J'aime les images qui restent naturelles, sans trop de retouche, parce qu'elles gardent plus de sincérité et d'authenticité. Dans l'immobilier aussi, l'image compte beaucoup, car une bonne photo permet de valoriser un bien et de donner une première impression plus sérieuse et plus attractive. Aujourd'hui, cet aspect visuel prend aussi beaucoup de place sur les réseaux sociaux, où ici c'est la vidéo qui joue un vrai rôle dans la manière de communiquer et de capter l'attention.</p>
                    <div class="grid grid-cols-3 gap-2 mt-4">
                        <img src="Images/Passions/Photographie/Composition & Lumière/triang.jpg" alt="Photographie" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Photographie/Composition & Lumière/triang.jpg', 'Images/Passions/Photographie/Composition & Lumière/baot.jpeg', 'Images/Passions/Photographie/Composition & Lumière/artgov.jpg'], 0)">
                        <img src="Images/Passions/Photographie/Composition & Lumière/baot.jpeg" alt="Photographie" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Photographie/Composition & Lumière/triang.jpg', 'Images/Passions/Photographie/Composition & Lumière/baot.jpeg', 'Images/Passions/Photographie/Composition & Lumière/artgov.jpg'], 1)">
                        <img src="Images/Passions/Photographie/Composition & Lumière/artgov.jpg" alt="Photographie" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Photographie/Composition & Lumière/triang.jpg', 'Images/Passions/Photographie/Composition & Lumière/baot.jpeg', 'Images/Passions/Photographie/Composition & Lumière/artgov.jpg'], 2)">
                    </div>
                </div>
            </div>
        `,
        
        'passions-cinema': `
            <h2 class="text-3xl font-bold mb-6">🎬 Cinématographie</h2>
            
            <div class="space-y-6">
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Scénario et narration visuelle</h3>
                    <p class="text-gray-300 mb-4">Ce qui me plaît dans le cinéma, c'est la façon de construire un scénario et de faire passer une émotion à travers la narration. Un film crée une progression, des retournements, des révélations, un enchaînement de tensions et une véritable ambiance jusqu'au dénouement. C'est aussi ce qui le rend inspirant, parce qu'il peut influencer la manière dont on perçoit un lieu, une situation ou même une façon de vivre.</p>
                    <div class="mt-4">
                        <img src="Images/Passions/Cinematographie/Storytelling visuel/procchainement.png" alt="Scénario" class="w-full h-48 object-cover rounded-lg cursor-pointer" onclick="openLightbox(['Images/Passions/Cinematographie/Storytelling visuel/procchainement.png'], 0)">
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Mise en scène et travail collectif</h3>
                    <p class="text-gray-300 mb-4">En réalité, un film repose sur un mélange de nombreux éléments : l'image, le montage, les effets spéciaux, le jeu d'acteur, les cascades… Ce qui impressionne, c'est surtout le travail d'équipe qu'il y a derrière, avec des métiers très différents qui doivent tous aller dans le même sens pour créer quelque chose de cohérent et marquant.</p>
                    <div class="mt-4">
                        <img src="Images/Passions/Cinematographie/Mise en scène/cinema - Copie.jpg" alt="Mise en scène" class="w-full h-48 object-cover rounded-lg cursor-pointer" onclick="openLightbox(['Images/Passions/Cinematographie/Mise en scène/cinema - Copie.jpg'], 0)">
                    </div>
                </div>
            </div>
        `,
        
        'passions-cuisine': `
            <h2 class="text-3xl font-bold mb-6">🍳 Cuisine</h2>
            
            <div class="space-y-6">
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Gastronomie & Précision</h3>
                    <p class="text-gray-300 mb-4">On passe une grande partie de notre temps à manger, et la cuisine occupe donc une place essentielle dans le quotidien. Alors on pourrait penser comme Émile dans Ratatouille, avec une vision très simple de la nourriture, mais c'est justement Rémy qui rappelle que savoir cuisiner permet de mieux manger, de maîtriser ce que l'on consomme et de trouver un vrai équilibre entre utilité, santé et plaisir. C'est aussi une compétence concrète qui touche à l'organisation, aux dosages, aux temps de cuisson et à la rigueur, un peu comme une gestion de projet à petite échelle.</p>
                    <div class="mt-4">
                        <img src="Images/Passions/Cuisine/Gastronomie & Précision/platburg.jpg" alt="Gastronomie" class="w-full h-48 object-cover rounded-lg cursor-pointer" onclick="openLightbox(['Images/Passions/Cuisine/Gastronomie & Précision/platburg.jpg'], 0)">
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Dressage et valorisation</h3>
                    <p class="text-gray-300 mb-4">Au-delà du goût, la présentation compte énormément, parce qu'un plat bien dressé donne tout de suite une impression plus soignée et plus qualitative. Le dressage demande du sens du détail, de l'harmonie et une certaine précision dans la manière de valoriser le produit. C'est ce mélange entre technique et esthétique qui rend la cuisine intéressante, car elle repose autant sur la maîtrise que sur le rendu final.</p>
                    <div class="grid grid-cols-2 gap-2 mt-4">
                        <img src="Images/Passions/Cuisine/Art du dressage/suchu.jpg" alt="Dressage" class="w-full h-32 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Cuisine/Art du dressage/suchu.jpg', 'Images/Passions/Cuisine/Art du dressage/mojito.jpg'], 0)">
                        <img src="Images/Passions/Cuisine/Art du dressage/mojito.jpg" alt="Dressage" class="w-full h-32 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Cuisine/Art du dressage/suchu.jpg', 'Images/Passions/Cuisine/Art du dressage/mojito.jpg'], 1)">
                    </div>
                </div>
            </div>
        `,
        
        'passions-musique': `
            <h2 class="text-3xl font-bold mb-6">🎧 Musique</h2>
            
            <div class="space-y-6">
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Piano</h3>
                    <p class="text-gray-300 mb-4">La pratique du piano m'a appris la discipline, la patience et l'exigence. Cet instrument m'a aussi aidé à développer ma concentration et ma rigueur au quotidien.</p>
                    <div class="grid grid-cols-3 gap-2 mt-4">
                        <img src="Images/Passions/Music/piano/piano.PNG" alt="Piano" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Music/piano/piano.PNG', 'Images/Passions/Music/piano/music2.jpeg', 'Images/Passions/Music/piano/pratique.jpeg', 'Images/Passions/Music/piano/music4.jpeg'], 0)">
                        <img src="Images/Passions/Music/piano/music2.jpeg" alt="Piano" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Music/piano/piano.PNG', 'Images/Passions/Music/piano/music2.jpeg', 'Images/Passions/Music/piano/pratique.jpeg', 'Images/Passions/Music/piano/music4.jpeg'], 1)">
                        <img src="Images/Passions/Music/piano/pratique.jpeg" alt="Piano" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Music/piano/piano.PNG', 'Images/Passions/Music/piano/music2.jpeg', 'Images/Passions/Music/piano/pratique.jpeg', 'Images/Passions/Music/piano/music4.jpeg'], 2)">
                        <img src="Images/Passions/Music/piano/music4.jpeg" alt="Piano" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Music/piano/piano.PNG', 'Images/Passions/Music/piano/music2.jpeg', 'Images/Passions/Music/piano/pratique.jpeg', 'Images/Passions/Music/piano/music4.jpeg'], 3)">
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Écoute & Ouverture d'esprit</h3>
                    <p class="text-gray-300 mb-4">J'aime découvrir des styles très variés, ce qui nourrit ma motivation et mon adaptabilité. Cette ouverture musicale me permet d'apprécier des univers différents et d'enrichir ma sensibilité.</p>
                    <div class="grid grid-cols-3 gap-2 mt-4">
                        <img src="Images/Passions/Music/Écoute & Ouverture d'esprit/music8.jpeg" alt="Écoute" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Music/Écoute & Ouverture d'esprit/music8.jpeg', 'Images/Passions/Music/Écoute & Ouverture d'esprit/ecoute_background.jpeg', 'Images/Passions/Music/Écoute & Ouverture d'esprit/music.png', 'Images/Passions/Music/Écoute & Ouverture d'esprit/music9.jpeg'], 0)">
                        <img src="Images/Passions/Music/Écoute & Ouverture d'esprit/ecoute_background.jpeg" alt="Écoute" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Music/Écoute & Ouverture d'esprit/music8.jpeg', 'Images/Passions/Music/Écoute & Ouverture d'esprit/ecoute_background.jpeg', 'Images/Passions/Music/Écoute & Ouverture d'esprit/music.png', 'Images/Passions/Music/Écoute & Ouverture d'esprit/music9.jpeg'], 1)">
                        <img src="Images/Passions/Music/Écoute & Ouverture d'esprit/music.png" alt="Écoute" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Music/Écoute & Ouverture d'esprit/music8.jpeg', 'Images/Passions/Music/Écoute & Ouverture d'esprit/ecoute_background.jpeg', 'Images/Passions/Music/Écoute & Ouverture d'esprit/music.png', 'Images/Passions/Music/Écoute & Ouverture d'esprit/music9.jpeg'], 2)">
                        <img src="Images/Passions/Music/Écoute & Ouverture d'esprit/music9.jpeg" alt="Écoute" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Music/Écoute & Ouverture d'esprit/music8.jpeg', 'Images/Passions/Music/Écoute & Ouverture d'esprit/ecoute_background.jpeg', 'Images/Passions/Music/Écoute & Ouverture d'esprit/music.png', 'Images/Passions/Music/Écoute & Ouverture d'esprit/music9.jpeg'], 3)">
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Concerts & Événements</h3>
                    <p class="text-gray-300 mb-4">Les concerts et les événements musicaux offrent des moments d'immersion forts et collectifs. J'aime cette dimension humaine, où la musique devient un sens du partage et une expérience partagée et marquante.</p>
                    <div class="grid grid-cols-2 gap-2 mt-4">
                        <img src="Images/Passions/Music/Concerts & Événements/micro.JPG" alt="Concerts" class="w-full h-32 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Music/Concerts & Événements/micro.JPG', 'Images/Passions/Music/Concerts & Événements/concert.png'], 0)">
                        <img src="Images/Passions/Music/Concerts & Événements/concert.png" alt="Concerts" class="w-full h-32 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Music/Concerts & Événements/micro.JPG', 'Images/Passions/Music/Concerts & Événements/concert.png'], 1)">
                    </div>
                </div>
            </div>
        `,
        
        'passions-mer': `
            <h2 class="text-3xl font-bold mb-6">🌊 Mer Nature</h2>
            
            <div class="space-y-6">
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Un cadre de vie inspirant</h3>
                    <p class="text-gray-300 mb-4">J'ai grandi dans le sud, dans un environnement privilégié entre la mer, les plages, les calanques et la montagne. J'ai aussi vécu l'an dernier sur le campus de Luminy, un lieu entouré d'une nature remarquable, ce qui a renforcé mon attachement à ces paysages.</p>
                    <div class="grid grid-cols-3 gap-2 mt-4">
                        <img src="Images/Passions/Mer Nature/Écosystèmes marins/aqua.png" alt="Mer" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Mer Nature/Écosystèmes marins/aqua.png', 'Images/Passions/Mer Nature/Écosystèmes marins/creature.png', 'Images/Passions/Mer Nature/Écosystèmes marins/etoile.png'], 0)">
                        <img src="Images/Passions/Mer Nature/Écosystèmes marins/creature.png" alt="Mer" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Mer Nature/Écosystèmes marins/aqua.png', 'Images/Passions/Mer Nature/Écosystèmes marins/creature.png', 'Images/Passions/Mer Nature/Écosystèmes marins/etoile.png'], 1)">
                        <img src="Images/Passions/Mer Nature/Écosystèmes marins/etoile.png" alt="Mer" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Mer Nature/Écosystèmes marins/aqua.png', 'Images/Passions/Mer Nature/Écosystèmes marins/creature.png', 'Images/Passions/Mer Nature/Écosystèmes marins/etoile.png'], 2)">
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Ressourcement</h3>
                    <p class="text-gray-300 mb-4">Je pense qu'on a tous besoin, à un moment ou à un autre, de se reconnecter à la nature. Que ce soit pour marcher, prendre l'air, voir la mer ou aller en montagne, ça fait du bien et ça permet de couper un peu du rythme du quotidien. En voyage aussi, découvrir de nouveaux paysages et des endroits impressionnants reste quelque chose de fort, parce que ça marque et ça laisse des souvenirs.</p>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
                        <img src="Images/Passions/Mer Nature/Ressourcement/yatch.png" alt="Ressourcement" class="w-full h-20 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Mer Nature/Ressourcement/yatch.png', 'Images/Passions/Mer Nature/Ressourcement/sttrop.png', 'Images/Passions/Mer Nature/Ressourcement/bois.png', 'Images/Passions/Mer Nature/Ressourcement/mouette.JPG', 'Images/Passions/Mer Nature/Ressourcement/montagne.png'], 0)">
                        <img src="Images/Passions/Mer Nature/Ressourcement/sttrop.png" alt="Ressourcement" class="w-full h-20 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Mer Nature/Ressourcement/yatch.png', 'Images/Passions/Mer Nature/Ressourcement/sttrop.png', 'Images/Passions/Mer Nature/Ressourcement/bois.png', 'Images/Passions/Mer Nature/Ressourcement/mouette.JPG', 'Images/Passions/Mer Nature/Ressourcement/montagne.png'], 1)">
                        <img src="Images/Passions/Mer Nature/Ressourcement/bois.png" alt="Ressourcement" class="w-full h-20 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Mer Nature/Ressourcement/yatch.png', 'Images/Passions/Mer Nature/Ressourcement/sttrop.png', 'Images/Passions/Mer Nature/Ressourcement/bois.png', 'Images/Passions/Mer Nature/Ressourcement/mouette.JPG', 'Images/Passions/Mer Nature/Ressourcement/montagne.png'], 2)">
                        <img src="Images/Passions/Mer Nature/Ressourcement/mouette.JPG" alt="Ressourcement" class="w-full h-20 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Mer Nature/Ressourcement/yatch.png', 'Images/Passions/Mer Nature/Ressourcement/sttrop.png', 'Images/Passions/Mer Nature/Ressourcement/bois.png', 'Images/Passions/Mer Nature/Ressourcement/mouette.JPG', 'Images/Passions/Mer Nature/Ressourcement/montagne.png'], 3)">
                        <img src="Images/Passions/Mer Nature/Ressourcement/montagne.png" alt="Ressourcement" class="w-full h-20 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Mer Nature/Ressourcement/yatch.png', 'Images/Passions/Mer Nature/Ressourcement/sttrop.png', 'Images/Passions/Mer Nature/Ressourcement/bois.png', 'Images/Passions/Mer Nature/Ressourcement/mouette.JPG', 'Images/Passions/Mer Nature/Ressourcement/montagne.png'], 4)">
                    </div>
                </div>
            </div>
        `,
        
        'passions-sensations': `
            <h2 class="text-3xl font-bold mb-6">⚡ Sensations Fortes</h2>
            
            <div class="space-y-6">
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Attractions</h3>
                    <p class="text-gray-300 mb-4">Les parcs d'attractions procurent des sensations fortes. Il y a tout un côté technique derrière les roller coasters entre les différents types de parcours, les loopings, les descentes et les enchaînements, il y a vraiment quelque chose d'intéressant dans la manière dont elles sont construites.</p>
                    <div class="grid grid-cols-2 gap-2 mt-4">
                        <img src="Images/Passions/Sensations fortes/attraction/italie.jpg" alt="Attractions" class="w-full h-32 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Sensations fortes/attraction/italie.jpg', 'Images/Passions/Sensations fortes/attraction/tourterrer.jpg'], 0)">
                        <img src="Images/Passions/Sensations fortes/attraction/tourterrer.jpg" alt="Attractions" class="w-full h-32 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Sensations fortes/attraction/italie.jpg', 'Images/Passions/Sensations fortes/attraction/tourterrer.jpg'], 1)">
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Saut en parachute (Tallard)</h3>
                    <p class="text-gray-300 mb-4">J'ai eu la chance de faire un saut en parachute à Tallard, et j'ai adoré cette expérience. Un vrai moment de plaisir et d'adrénaline, avec des sensations assez folles du début à la fin.</p>
                    <div class="grid grid-cols-3 gap-2 mt-4">
                        <img src="Images/Passions/Sensations fortes/Saut Parachute/para.PNG" alt="Parachute" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Sensations fortes/Saut Parachute/para.PNG', 'Images/Passions/Sensations fortes/Saut Parachute/deploiement.JPG', 'Images/Passions/Sensations fortes/Saut Parachute/saut.JPG'], 0)">
                        <img src="Images/Passions/Sensations fortes/Saut Parachute/deploiement.JPG" alt="Parachute" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Sensations fortes/Saut Parachute/para.PNG', 'Images/Passions/Sensations fortes/Saut Parachute/deploiement.JPG', 'Images/Passions/Sensations fortes/Saut Parachute/saut.JPG'], 1)">
                        <img src="Images/Passions/Sensations fortes/Saut Parachute/saut.JPG" alt="Parachute" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Sensations fortes/Saut Parachute/para.PNG', 'Images/Passions/Sensations fortes/Saut Parachute/deploiement.JPG', 'Images/Passions/Sensations fortes/Saut Parachute/saut.JPG'], 2)">
                    </div>
                </div>
                
                <div class="glassmorphism-dark rounded-lg p-6">
                    <h3 class="text-xl font-bold mb-3">🔵 Exploration Urbaine (Patrimoine Oublié)</h3>
                    <p class="text-gray-300 mb-4">Permet de découvrir l'âme des bâtiments délaissés. Ce que j'aime, c'est l'atmosphère particulière de ces endroits et le fait qu'ils racontent encore quelque chose, même s'ils sont délaissés.</p>
                    <div class="grid grid-cols-3 gap-2 mt-4">
                        <img src="Images/Passions/Sensations fortes/Urbex/mousse.png" alt="Urbex" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Sensations fortes/Urbex/mousse.png', 'Images/Passions/Sensations fortes/Urbex/piscine.jpg', 'Images/Passions/Sensations fortes/Urbex/plongeoir.jpg'], 0)">
                        <img src="Images/Passions/Sensations fortes/Urbex/piscine.jpg" alt="Urbex" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Sensations fortes/Urbex/mousse.png', 'Images/Passions/Sensations fortes/Urbex/piscine.jpg', 'Images/Passions/Sensations fortes/Urbex/plongeoir.jpg'], 1)">
                        <img src="Images/Passions/Sensations fortes/Urbex/plongeoir.jpg" alt="Urbex" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Sensations fortes/Urbex/mousse.png', 'Images/Passions/Sensations fortes/Urbex/piscine.jpg', 'Images/Passions/Sensations fortes/Urbex/plongeoir.jpg'], 2)">
                    </div>
                </div>
            </div>
        `,
        
        'default': `
            <h2 class="text-3xl font-bold mb-6">Contenu en cours de développement</h2>
            <p class="text-gray-300">Cette section est en cours de préparation. Revenez bientôt !</p>
        `
    };
    
    // Mapping des titres pour chaque modalId
    const titles = {
        'bts-immobilier': '🎓 BTS Professions Immobilières',
        'but-rt': '🎓 BUT Réseaux & Télécoms - Cybersécurité',
        'bac-general': '🎓 Baccalauréat Général - Les Fondations Logiques',
        'stage-immobilier': '🏠 Stage en Agence Immobilière (ERA Roquevaire)',
        'mcdonalds': '🍔 Employé Polyvalent - McDonald\'s',
        'animateur': '🎯 Animateur - Centres de Loisirs',
        'crm-immobilier': '📊 CRM Immobilier : L\'outil de pilotage',
        'simulateur': '📈 Simulateur d\'Estimation "Expert"',
        'default': '📝 Contenu en cours de développement'
    };
    
    // Set title
    if (titleElement) {
        titleElement.textContent = titles[modalId] || titles['default'];
    }
    
    // Set content
    const content = modalContents[modalId] || modalContents['default'];
    if (contentElement) {
        contentElement.innerHTML = content;
    }
}


// Lightbox System
function initializeLightbox() {
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const closeLightbox = document.getElementById('closeLightbox');
    const prevImage = document.getElementById('prevImage');
    const nextImage = document.getElementById('nextImage');
    
    if (closeLightbox) {
        closeLightbox.addEventListener('click', closeLightboxFunction);
    }
    
    if (prevImage) {
        prevImage.addEventListener('click', navigateLightbox('prev'));
    }
    
    if (nextImage) {
        nextImage.addEventListener('click', navigateLightbox('next'));
    }
    
    if (lightboxOverlay) {
        lightboxOverlay.addEventListener('click', (e) => {
            if (e.target === lightboxOverlay) {
                closeLightboxFunction();
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightboxOverlay.classList.contains('hidden')) {
            if (e.key === 'Escape') closeLightboxFunction();
            if (e.key === 'ArrowLeft') navigateLightbox('prev')();
            if (e.key === 'ArrowRight') navigateLightbox('next')();
        }
    });
}

let currentLightboxImages = [];
let currentImageIndex = 0;

function openLightbox(images, startIndex = 0) {
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const lightboxImage = document.getElementById('lightboxImage');
    
    if (!lightboxOverlay || !lightboxImage) return;
    
    currentLightboxImages = images;
    currentImageIndex = startIndex;
    
    updateLightboxImage();
    updateLightboxIndicators();
    
    lightboxOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeLightboxFunction() {
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    
    if (lightboxOverlay) {
        lightboxOverlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function navigateLightbox(direction) {
    return function() {
        if (direction === 'prev') {
            currentImageIndex = (currentImageIndex - 1 + currentLightboxImages.length) % currentLightboxImages.length;
        } else {
            currentImageIndex = (currentImageIndex + 1) % currentLightboxImages.length;
        }
        
        updateLightboxImage();
        updateLightboxIndicators();
    };
}

function updateLightboxImage() {
    const lightboxImage = document.getElementById('lightboxImage');
    if (lightboxImage && currentLightboxImages[currentImageIndex]) {
        lightboxImage.src = currentLightboxImages[currentImageIndex];
    }
}

function updateLightboxIndicators() {
    const indicatorContainer = document.getElementById('lightboxIndicator');
    if (!indicatorContainer) return;
    
    indicatorContainer.innerHTML = '';
    
    currentLightboxImages.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = `w-2 h-2 rounded-full transition-colors ${
            index === currentImageIndex ? 'bg-white' : 'bg-white/50'
        }`;
        indicator.addEventListener('click', () => {
            currentImageIndex = index;
            updateLightboxImage();
            updateLightboxIndicators();
        });
        indicatorContainer.appendChild(indicator);
    });
}

// Contact Form
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

function preFillForm(type) {
    const form = document.getElementById('contactForm');
    const subjectField = form?.querySelector('select[name="subject"]');
    const messageField = form?.querySelector('textarea[name="message"]');
    
    if (!form || !subjectField || !messageField) return;
    
    // Scroll to form
    scrollToSection('contact');
    
    // Pre-fill based on type
    setTimeout(() => {
        if (type === 'estimation') {
            subjectField.value = 'Demande d\'estimation immobilière';
            messageField.value = 'Bonjour Evan, je souhaiterais obtenir une estimation pour mon bien situé dans le secteur...';
        } else if (type === 'mission') {
            subjectField.value = 'Proposition de mission / job';
            messageField.value = 'Bonjour, j\'ai vu votre profil et j\'aimerais vous proposer une mission concernant...';
        }
        
        // Add visual feedback
        messageField.classList.add('ring-2', 'ring-blue-500', 'ring-opacity-50');
        setTimeout(() => {
            messageField.classList.remove('ring-2', 'ring-blue-500', 'ring-opacity-50');
        }, 1000);
    }, 500);
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 mr-2 animate-spin"></i> Envoi en cours...';
    lucide.createIcons();
    
    // Submit form
    fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            showFormMessage('success', 'Merci ! Votre message a bien été envoyé. Je vous réponds plus vite que mon ombre.');
            form.reset();
        } else {
            showFormMessage('error', 'Une erreur est survenue. Veuillez réessayer.');
        }
    })
    .catch(error => {
        showFormMessage('error', 'Une erreur est survenue. Veuillez réessayer.');
    })
    .finally(() => {
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Envoyer le message';
        lucide.createIcons();
    });
}

function showFormMessage(type, message) {
    const formMessage = document.getElementById('formMessage');
    if (!formMessage) return;
    
    formMessage.className = `mt-4 p-4 rounded-lg ${
        type === 'success' 
            ? 'bg-green-900/20 border border-green-500 text-green-400' 
            : 'bg-red-900/20 border border-red-500 text-red-400'
    }`;
    formMessage.textContent = message;
    formMessage.classList.remove('hidden');
    
    // Hide after 5 seconds
    setTimeout(() => {
        formMessage.classList.add('hidden');
    }, 5000);
}

// Real Estate Estimation Calculator
function calculateEstimation() {
    const surface = parseFloat(document.getElementById('surface')?.value) || 100;
    const terrain = parseFloat(document.getElementById('terrain')?.value) || 500;
    const pieces = parseInt(document.getElementById('pieces')?.value) || 3;
    const secteur = document.getElementById('secteur')?.value || 'aubagne';
    const etat = document.getElementById('etat')?.value || 'bon';
    const dpe = document.getElementById('dpe')?.value || 'D';
    const travaux = parseFloat(document.getElementById('travaux')?.value) || 0;
    
    // Base prices per m² by sector (2024-2025 market data)
    const prixBase = {
        'aubagne': 3200,
        'marseille': 3800,
        'roquevaire': 2900,
        'brignoles': 2400,
        'la_destrousse': 3100
    };
    
    // State coefficients
    const coefficientsEtat = {
        'neuf': 1.15,
        'bon': 1.0,
        'rafraichir': 0.85,
        'travaux': 0.70
    };
    
    // DPE coefficients (energy performance impact)
    const coefficientsDPE = {
        'A': 1.12,
        'B': 1.08,
        'C': 1.05,
        'D': 1.0,
        'E': 0.92,
        'F': 0.85,
        'G': 0.75
    };
    
    // Room count adjustment
    const ajustementPieces = {
        1: 0.9,
        2: 0.95,
        3: 1.0,
        4: 1.05,
        5: 1.08,
        6: 1.10
    };
    
    // Calculate base value
    let valeurBase = surface * prixBase[secteur];
    
    // Apply coefficients
    valeurBase *= coefficientsEtat[etat];
    valeurBase *= coefficientsDPE[dpe];
    valeurBase *= ajustementPieces[pieces];
    
    // Add terrain value (30% of terrain surface value)
    const valeurTerrain = terrain * 150 * 0.3;
    valeurBase += valeurTerrain;
    
    // Subtract renovation costs
    valeurBase -= travaux;
    
    // Calculate range (±10%)
    const valeurMin = Math.round(valeurBase * 0.9);
    const valeurMax = Math.round(valeurBase * 1.1);
    const valeurMoyenne = Math.round(valeurBase);
    
    // Display results
    const resultDiv = document.getElementById('estimationResult');
    const resultContent = document.getElementById('resultContent');
    
    if (resultDiv && resultContent) {
        resultContent.innerHTML = `
            <div class="grid md:grid-cols-3 gap-4 text-center">
                <div class="bg-gray-800 p-4 rounded-lg">
                    <p class="text-sm text-gray-400">Prix minimum</p>
                    <p class="text-2xl font-bold text-blue-400">${valeurMin.toLocaleString('fr-FR')} €</p>
                </div>
                <div class="bg-gray-800 p-4 rounded-lg">
                    <p class="text-sm text-gray-400">Prix estimé</p>
                    <p class="text-2xl font-bold text-green-400">${valeurMoyenne.toLocaleString('fr-FR')} €</p>
                </div>
                <div class="bg-gray-800 p-4 rounded-lg">
                    <p class="text-sm text-gray-400">Prix maximum</p>
                    <p class="text-2xl font-bold text-purple-400">${valeurMax.toLocaleString('fr-FR')} €</p>
                </div>
            </div>
            <div class="mt-4 p-4 bg-gray-800 rounded-lg">
                <p class="text-sm text-gray-300">
                    <strong>Détail du calcul :</strong><br>
                    • Surface (${surface}m²) × Prix base (${prixBase[secteur]}€/m²) = ${(surface * prixBase[secteur]).toLocaleString('fr-FR')}€<br>
                    • Ajustement état : ${coefficientsEtat[etat]}<br>
                    • Ajustement DPE : ${coefficientsDPE[dpe]}<br>
                    • Terrain : ${valeurTerrain.toLocaleString('fr-FR')}€<br>
                    • Travaux : -${travaux.toLocaleString('fr-FR')}€
                </p>
            </div>
        `;
        
        resultDiv.classList.remove('hidden');
        
        // Scroll to result
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Re-initialize Lucide icons
        lucide.createIcons();
    }
}

// Add more modal contents for Passions
const passionsModalContents = {
    'passions-sports': `
        <h2 class="text-3xl font-bold mb-6">🏃 Sports</h2>
        
        <div class="space-y-6">
            <div class="glassmorphism-dark rounded-lg p-6">
                <h3 class="text-xl font-bold mb-3">🔵 Musculation</h3>
                <p class="text-gray-300 mb-4">J'aime le côté progression, discipline et objectifs à atteindre petit à petit. C'est un sport qui montre bien l'importance de l'effort régulier pour obtenir des résultats. Pendant mon année à Luminy, j'ai aussi découvert la calisthénie, et j'ai trouvé le fait de travailler pour "débloquer" des figures (front lever, planche, handstand) vraiment intéressant ; Ça demande de vraiment maîtriser son corps, son équilibre et sa coordination.</p>
                <div class="grid grid-cols-3 gap-2 mt-4">
                    <img src="Images/Passions/sports/muscu/musculation9.jpeg" alt="Musculation" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/sports/muscu/musculation9.jpeg', 'Images/Passions/sports/muscu/musculation6.jpeg', 'Images/Passions/sports/muscu/musculation_background.jpeg'], 0)">
                    <img src="Images/Passions/sports/muscu/musculation6.jpeg" alt="Musculation" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/sports/muscu/musculation9.jpeg', 'Images/Passions/sports/muscu/musculation6.jpeg', 'Images/Passions/sports/muscu/musculation_background.jpeg'], 1)">
                    <img src="Images/Passions/sports/muscu/musculation_background.jpeg" alt="Musculation" class="w-full h-24 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/sports/muscu/musculation9.jpeg', 'Images/Passions/sports/muscu/musculation6.jpeg', 'Images/Passions/sports/muscu/musculation_background.jpeg'], 2)">
                </div>
            </div>
            
            <div class="glassmorphism-dark rounded-lg p-6">
                <h3 class="text-xl font-bold mb-3">🔵 Ski</h3>
                <p class="text-gray-300 mb-4">C'est un sport que j'ai eu la chance de commencer jeune, et aujourd'hui j'ai un bon niveau qui me permet de vraiment me faire plaisir et d'être plus libre dans ma pratique. J'aime la vitesse, mais surtout le style, les beaux mouvements et les sensations que ça procure. Et honnêtement, la poudreuse, c'est ce que je préfère : il y a une vraie sensation de flotter avec une impression de légèreté et de liberté que je retrouve rarement ailleurs.</p>
                <div class="mt-4">
                    <img src="Images/Passions/sports/ski/ski_background.jpeg" alt="Ski" class="w-full h-48 object-cover rounded-lg cursor-pointer" onclick="openLightbox(['Images/Passions/sports/ski/ski_background.jpeg'], 0)">
                </div>
            </div>
            
            <div class="glassmorphism-dark rounded-lg p-6">
                <h3 class="text-xl font-bold mb-3">🔵 VTT</h3>
                <p class="text-gray-300 mb-4">J'en ai fait pendant 2 ans en club, et j'aime encore en refaire de temps en temps. Ce que j'aime dans ce sport, c'est qu'il fait travailler à la fois les muscles, l'endurance et la technique. Il y a aussi de vraies sensations dans les singles, où il faut rester concentré et réactif. C'est un sport qui me plaît parce qu'il mélange effort, plaisir et sensations fortes.</p>
                <div class="grid grid-cols-4 gap-2 mt-4">
                    <img src="Images/Passions/sports/vtt/boue.png" alt="VTT" class="w-full h-20 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/sports/vtt/boue.png', 'Images/Passions/sports/vtt/tramplin.JPG', 'Images/Passions/sports/vtt/velo8.jpeg', 'Images/Passions/sports/vtt/velo_background.jpeg'], 0)">
                    <img src="Images/Passions/sports/vtt/tramplin.JPG" alt="VTT" class="w-full h-20 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/sports/vtt/boue.png', 'Images/Passions/sports/vtt/tramplin.JPG', 'Images/Passions/sports/vtt/velo8.jpeg', 'Images/Passions/sports/vtt/velo_background.jpeg'], 1)">
                    <img src="Images/Passions/sports/vtt/velo8.jpeg" alt="VTT" class="w-full h-20 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/sports/vtt/boue.png', 'Images/Passions/sports/vtt/tramplin.JPG', 'Images/Passions/sports/vtt/velo8.jpeg', 'Images/Passions/sports/vtt/velo_background.jpeg'], 2)">
                    <img src="Images/Passions/sports/vtt/velo_background.jpeg" alt="VTT" class="w-full h-20 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/sports/vtt/boue.png', 'Images/Passions/sports/vtt/tramplin.JPG', 'Images/Passions/sports/vtt/velo8.jpeg', 'Images/Passions/sports/vtt/velo_background.jpeg'], 3)">
                </div>
            </div>
            
            <div class="glassmorphism-dark rounded-lg p-6">
                <h3 class="text-xl font-bold mb-3">🔵 Course à pied</h3>
                <p class="text-gray-300 mb-4">La course à pied aide beaucoup à travailler le souffle, l'endurance et surtout le mental. C'est une activité qui apprend à tenir dans la durée, à rester régulier et à ne pas lâcher quand c'est plus difficile. Elle développe une vraie persévérance, utile aussi dans les projets de longue durée.</p>
                <div class="mt-4">
                    <img src="Images/Passions/sports/course/course_background.jpeg" alt="Course" class="w-full h-48 object-cover rounded-lg cursor-pointer" onclick="openLightbox(['Images/Passions/sports/course/course_background.jpeg'], 0)">
                </div>
            </div>
            
            <div class="glassmorphism-dark rounded-lg p-6">
                <h3 class="text-xl font-bold mb-3">🔵 Randonnée</h3>
                <p class="text-gray-300 mb-4">C'est une vraie occasion de prendre du recul, de souffler un peu et de profiter pleinement de ce qui nous entoure. De plus On vit dans une région qui offre de superbes parcours, entre calanques, Sainte-Baume, Verdon, les sentiers vers Saint-Tropez….</p>
                <div class="mt-4">
                    <img src="Images/Passions/sports/Rando/sttrop.JPG" alt="Randonnée" class="w-full h-48 object-cover rounded-lg cursor-pointer" onclick="openLightbox(['Images/Passions/sports/Rando/sttrop.JPG'], 0)">
                </div>
            </div>
        </div>
    `,
    
    'passions-automobile': `
        <h2 class="text-3xl font-bold mb-6">🏎️ Automobile</h2>
        
        <div class="space-y-6">
            <div class="glassmorphism-dark rounded-lg p-6">
                <h3 class="text-xl font-bold mb-3">🔵 Événements (GT4, GP Historique Le Castellet)</h3>
                <p class="text-gray-300 mb-4">Les événements automobiles permettent de voir de près l'élite du sport auto, en GT4, au Grand Prix Historique… Notamment avec le Castellet à proximité. Certains sont aussi très accessibles, parfois peu chers voire gratuits, car moins médiatisés que la F1. Pourtant, l'expérience reste incroyable, avec une vraie proximité des voitures, des équipes et l'ambiance du paddock. C'est une autre manière de vivre le sport auto, plus accessible mais tout aussi immersive.</p>
                <div class="grid grid-cols-4 gap-2 mt-4">
                    <img src="Images/Passions/Automobile/evenement/evenements.jpg" alt="Événements" class="w-full h-20 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Automobile/evenement/evenements.jpg', 'Images/Passions/Automobile/evenement/cocpite.jpg', 'Images/Passions/Automobile/evenement/garage.jpg', 'Images/Passions/Automobile/evenement/paul.jpg', 'Images/Passions/Automobile/evenement/rasso.PNG'], 0)">
                    <img src="Images/Passions/Automobile/evenement/cocpite.jpg" alt="Événements" class="w-full h-20 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Automobile/evenement/evenements.jpg', 'Images/Passions/Automobile/evenement/cocpite.jpg', 'Images/Passions/Automobile/evenement/garage.jpg', 'Images/Passions/Automobile/evenement/paul.jpg', 'Images/Passions/Automobile/evenement/rasso.PNG'], 1)">
                    <img src="Images/Passions/Automobile/evenement/garage.jpg" alt="Événements" class="w-full h-20 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Automobile/evenement/evenements.jpg', 'Images/Passions/Automobile/evenement/cocpite.jpg', 'Images/Passions/Automobile/evenement/garage.jpg', 'Images/Passions/Automobile/evenement/paul.jpg', 'Images/Passions/Automobile/evenement/rasso.PNG'], 2)">
                    <img src="Images/Passions/Automobile/evenement/paul.jpg" alt="Événements" class="w-full h-20 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Automobile/evenement/evenements.jpg', 'Images/Passions/Automobile/evenement/cocpite.jpg', 'Images/Passions/Automobile/evenement/garage.jpg', 'Images/Passions/Automobile/evenement/paul.jpg', 'Images/Passions/Automobile/evenement/rasso.PNG'], 3)">
                    <img src="Images/Passions/Automobile/evenement/rasso.PNG" alt="Événements" class="w-full h-20 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Automobile/evenement/evenements.jpg', 'Images/Passions/Automobile/evenement/cocpite.jpg', 'Images/Passions/Automobile/evenement/garage.jpg', 'Images/Passions/Automobile/evenement/paul.jpg', 'Images/Passions/Automobile/evenement/rasso.PNG'], 4)">
                </div>
            </div>
            
            <div class="glassmorphism-dark rounded-lg p-6">
                <h3 class="text-xl font-bold mb-3">🔵 Karting</h3>
                <p class="text-gray-300 mb-4">Le karting, c'est souvent par-là que commencent tous les pilotes pros. On ressent vraiment les sensations de pilotage, dans les virages comme dans les phases d'accélération, et c'est intéressant de pouvoir tester différents circuits. En plus, on a la chance d'en avoir de très bons aux alentours. C'est une bonne école pour développer les bases du pilotage (trajectoires, freinage, point de corde), ses réflexes et son sang-froid.</p>
                <div class="grid grid-cols-2 gap-2 mt-4">
                    <img src="Images/Passions/Automobile/Karting/karting1.jpg" alt="Karting" class="w-full h-32 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Automobile/Karting/karting1.jpg', 'Images/Passions/Automobile/Karting/ligne.png', 'Images/Passions/Automobile/Karting/kartcast.jpg'], 0)">
                    <img src="Images/Passions/Automobile/Karting/ligne.png" alt="Karting" class="w-full h-32 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Automobile/Karting/karting1.jpg', 'Images/Passions/Automobile/Karting/ligne.png', 'Images/Passions/Automobile/Karting/kartcast.jpg'], 1)">
                    <img src="Images/Passions/Automobile/Karting/kartcast.jpg" alt="Karting" class="w-full h-32 object-cover rounded cursor-pointer filmstrip-item" onclick="openLightbox(['Images/Passions/Automobile/Karting/karting1.jpg', 'Images/Passions/Automobile/Karting/ligne.png', 'Images/Passions/Automobile/Karting/kartcast.jpg'], 2)">
                </div>
            </div>
            
            <div class="glassmorphism-dark rounded-lg p-6">
                <h3 class="text-xl font-bold mb-3">🔵 Suivi de la F1</h3>
                <p class="text-gray-300 mb-4">La F1 attire par son niveau technologique, sa stratégie et l'importance de la donnée dans la performance. Au-delà de la vitesse, tout se joue aussi sur les réglages, les choix d'équipe et l'analyse de course. C'est une discipline complète, où la performance dépend autant de la voiture que de la réflexion autour de la course.</p>
                <div class="mt-4">
                    <img src="Images/Passions/Automobile/passion + f1/f1.png" alt="F1" class="w-full h-48 object-cover rounded-lg cursor-pointer" onclick="openLightbox(['Images/Passions/Automobile/passion + f1/f1.png'], 0)">
                </div>
            </div>
        </div>
    `
};

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Global function for modal opening (accessible from HTML onclick)
window.openModal = function openModal(modalId) {
    console.log('openModal called with:', modalId);
    
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    if (!modal || !modalTitle || !modalContent) {
        console.error('Modal elements not found');
        alert('Erreur: Éléments de la modale non trouvés');
        return;
    }
    
    // Load modal content
    loadModalContent(modalId, modalTitle, modalContent);
    
    // Show modal
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    console.log('Modal should be visible now');
    
    // Re-initialize Lucide icons
    setTimeout(() => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }, 100);
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// Simplified lightbox opening - GUARANTEED TO WORK
window.openLightbox = function(images, startIndex = 0) {
    currentLightboxImages = images;
    currentImageIndex = startIndex;
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const leftNav = lightbox.querySelector('.lightbox-nav.left-4');
    const rightNav = lightbox.querySelector('.lightbox-nav.right-4');
    
    if (lightbox && lightboxImg) {
        // Show lightbox
        lightbox.style.display = 'block';
        lightboxImg.src = images[startIndex];
        document.body.style.overflow = 'hidden';
        
        // FORCE SHOW ARROWS FOR DEBUG - Always show arrows
        if (leftNav) {
            leftNav.style.display = 'flex';
            leftNav.style.visibility = 'visible';
            leftNav.style.opacity = '1';
            leftNav.style.zIndex = '9999';
        }
        if (rightNav) {
            rightNav.style.display = 'flex';
            rightNav.style.visibility = 'visible';
            rightNav.style.opacity = '1';
            rightNav.style.zIndex = '9999';
        }
        
        console.log('DEBUG: Arrows forced to show');
        
        // Re-initialize Lucide icons
        setTimeout(() => {
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }, 50);
    }
};

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function navigateLightbox(direction) {
    if (direction === -1) {
        currentImageIndex = (currentImageIndex - 1 + currentLightboxImages.length) % currentLightboxImages.length;
    } else {
        currentImageIndex = (currentImageIndex + 1) % currentLightboxImages.length;
    }
    
    const lightboxImg = document.getElementById('lightboxImg');
    if (lightboxImg) {
        lightboxImg.src = currentLightboxImages[currentImageIndex];
    }
}

// Direct navigation functions for onclick
window.navigateLightboxLeft = function() {
    navigateLightbox(-1);
};

window.navigateLightboxRight = function() {
    navigateLightbox(1);
};

// Simplified lightbox events - use onclick attributes like Copie (2)
function initializeLightboxEvents() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    
    // Fermeture au clic sur le fond
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Navigation au clavier
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'block') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigateLightbox(-1)();
            if (e.key === 'ArrowRight') navigateLightbox(1)();
        }
    });
}

// Make functions globally accessible - CRITICAL for onclick to work
window.closeLightbox = closeLightbox;
window.navigateLightbox = navigateLightbox;
window.navigateLightboxLeft = navigateLightboxLeft;
window.navigateLightboxRight = navigateLightboxRight;

// Global function for form pre-fill (accessible from HTML onclick)
window.preFillForm = function(type) {
    preFillForm(type);
};

// Global function for calculate estimation (accessible from HTML onclick)
window.calculateEstimation = function() {
    calculateEstimation();
};
