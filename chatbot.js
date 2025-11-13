// --- Chatbot Project Knowledge Base (Derived from documentation) ---
const projectKnowledge = {
    // General Information & Greetings
    'GREETING': "Hello! I am HealthBot, your assistant for the **Health Care Connect** online clinic. How can I help you today?",
    'GENERAL': "Health Care Connect is an online clinic providing high-quality healthcare services, including consultations, prescription refills, and mental health support, all from the comfort of your home. Our tagline is: **'Your Health, Our Priority'**.",

    // Services
    'SERVICES': "Our comprehensive offerings include: **General Consultation** (Book appointments with certified general physicians for routine checkups, health advice, and prescriptions.), **Specialist Consultation** (Connect with top specialists (Cardiologist, Dermatologist, Neurologist, etc.) for expert opinions and treatment plans.), **Emergency & Ambulance Services** (24/7 ambulance and emergency assistance with real-time tracking and priority booking.), **Pharmacy & Medicine Delivery** (Order prescribed medicines online and get them delivered to your doorstep quickly.),  **Vaccination & Immunization** (Book and track vaccination schedules for children and adults with reminders and certified records.), and **Mental Health** support.",
    'BOOK': "To book an appointment, please look for the **'Book an Appointment'** Call-to-Action (CTA) button on the Home or Services pages.",
    'ADDITIONAL': "We also offer **Prescription refills**, **Lab results** management, and **Medical records management**.",

    // Doctors
    'DOCTORS': "You can meet our qualified team, including **Dr. Ahsaan** (General consultant), **Dr. Amna** (Specialist consultant) and **Dr. Haris** (Mental health expert & consultant).",

    
    // Contact
    'CONTACT': "You can reach us via our Contact Page form, or directly: **Address:** 123 Main St, Anytown, USA 12345, **Phone:** 555-555-5555, **Email:** info@healthcareconnect.com.",
    // Appointment
    'Appointment': "You can book an appointment via our Appointment Page form",

    // Security
    'CONFIDENTIAL': "Yes, security is a key feature. Our service promises **secure and confidential** consultations, as well as handling of medical records.",
    
    // Fallback/Unknown
    'FALLBACK': "I'm sorry, I don't have information on that specific topic. Try asking about 'Services', 'Doctors', 'Contact', or 'Appointments'.",
};

// --- DOM Element References ---
// Using IDs defined in the legacy HTML structure
const chatbotIcon = document.getElementById('chatbot-icon');
const chatWindow = document.getElementById('chatbot-container'); // Your container element
const closeChatBtn = document.getElementById('close-chat-btn');
const chatForm = document.getElementById('chat-form');
const chatInputField = document.getElementById('chat-input-field'); // Your input field ID
const chatBody = document.getElementById('chat-body');

// --- State Management ---
let hasGreeted = false;

// --- Utility Functions ---

/**
 * Appends a message to the chat body and handles scrolling.
 * Uses your legacy class names: bot-message and user-message.
 */
function appendMessage(text, sender) {
    const messageElement = document.createElement('div');
    // Use your legacy classes: bot-message or user-message
    messageElement.classList.add('message', `${sender}-message`); 
    
    // Convert **text** to <strong>text</strong> for bolding
    const formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    messageElement.innerHTML = formattedText;
    chatBody.appendChild(messageElement);
    chatBody.scrollTop = chatBody.scrollHeight;
}

/**
 * Determines the bot's response based on keywords.
 */
function getBotResponse(query) {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('hey') || lowerQuery.includes('greetings')) {
        return projectKnowledge.GREETING;
    }
    if (lowerQuery.includes('service') || lowerQuery.includes('offer') || lowerQuery.includes('primary care') || lowerQuery.includes('specialty')) {
        return projectKnowledge.SERVICES;
    }
    if (lowerQuery.includes('doctor') || lowerQuery.includes('staff') || lowerQuery.includes('team') || lowerQuery.includes('dr.')) {
        return projectKnowledge.DOCTORS;
    }
    if (lowerQuery.includes('contact') || lowerQuery.includes('address') || lowerQuery.includes('phone') || lowerQuery.includes('email')) {
        return projectKnowledge.CONTACT;
    }
    if (lowerQuery.includes('appointment') || lowerQuery.includes('book') || lowerQuery.includes('schedule') || lowerQuery.includes('cta')) {
        return projectKnowledge.BOOK;
    }
    if (lowerQuery.includes('additional') || lowerQuery.includes('refill') || lowerQuery.includes('lab') || lowerQuery.includes('records')) {
        return projectKnowledge.ADDITIONAL;
    }
    if (lowerQuery.includes('secure') || lowerQuery.includes('confidential') || lowerQuery.includes('privacy')) {
        return projectKnowledge.CONFIDENTIAL;
    }
    if (lowerQuery.includes('what is') || lowerQuery.includes('about') || lowerQuery.includes('tagline')) {
        return projectKnowledge.GENERAL;
    }
    
    // Default fallback
    return projectKnowledge.FALLBACK;
}

/**
 * Toggles the visibility of the chat window.
 */
function toggleChat() {
    // Toggle the display property defined by the .chatbot-container class
    if (chatWindow.style.display === "flex") {
        chatWindow.style.display = "none";
    } else {
        chatWindow.style.display = "flex";
        
        // Send initial greeting only once
        if (!hasGreeted) {
            appendMessage(projectKnowledge.GREETING, 'bot');
            hasGreeted = true;
        }
        // Focus the input field for immediate typing
        chatInputField.focus();
    }
}

/**
 * Handles the submission of the chat form.
 */
function handleChatSubmit(event) {
    event.preventDefault();

    const userText = chatInputField.value.trim();
    if (userText === '') return;

    // 1. Display user's message
    appendMessage(userText, 'user');

    // 2. Clear input field immediately
    chatInputField.value = '';

    // 3. Generate bot's response
    const botResponseText = getBotResponse(userText);
    
    // 4. Simulate bot typing delay for better UX
    setTimeout(() => {
        appendMessage(botResponseText, 'bot');
    }, 500); 
}

// --- Event Listeners Initialization ---
window.onload = function() {
    // Attach event listeners to the icon, close button, and form
    if (chatbotIcon) chatbotIcon.addEventListener('click', toggleChat);
    if (closeChatBtn) closeChatBtn.addEventListener('click', toggleChat);
    if (chatForm) chatForm.addEventListener('submit', handleChatSubmit);
};