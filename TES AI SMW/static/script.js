/**
 * Nothea AI - All-in-one JavaScript
 * Menggabungkan semua fungsionalitas UI, Chat, dan Utilitas
 */

// Utility Class
class Utils {
    /**
     * Show notification toast
     */
    static showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(n => n.remove());
        
        // Create new notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `<i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i> ${message}`;
        document.body.appendChild(notification);
        
        // Animation sequence
        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 3000);
        }, 100);
    }
    
    /**
     * Format file size in human readable format
     */
    static formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    /**
     * Get readable model name
     */
    static getModelName(model) {
        switch(model) {
            case 'gemini': return 'Gemini Pro';
            case 'groq': return 'Groq';
            case 'combined': return 'Kombinasi';
            default: return model;
        }
    }

    /**
     * Get readable response length name
     */
    static getResponseLengthName(value) {
        switch(value) {
            case 'short': return 'Pendek';
            case 'medium': return 'Sedang';
            case 'long': return 'Panjang';
            default: return value;
        }
    }
}

// UI Controls Class
class NothoaUI {
    constructor() {
        // DOM Elements
        this.themeSelect = document.getElementById('theme');
        this.creativityInput = document.getElementById('creativity');
        this.creativityValue = document.getElementById('creativity-value');
        this.responseLengthSelect = document.getElementById('response-length');
        this.modelSelect = document.getElementById('model');
        
        // Initialize
        this.initializeUI();
    }
    
    /**
     * Initialize UI elements and load user preferences
     */
    initializeUI() {
        // Load and apply saved preferences
        this.loadSavedPreferences();
        
        // Add event listeners for settings changes
        this.setupEventListeners();
        
        // Apply initial theme
        this.applyTheme(this.themeSelect.value);
        
        // Add animation to sidebar panels
        this.animateUIElements();
    }
    
    /**
     * Set up all UI-related event listeners
     */
    setupEventListeners() {
        // Theme selector
        this.themeSelect.addEventListener('change', () => {
            const theme = this.themeSelect.value;
            this.applyTheme(theme);
            localStorage.setItem('theme', theme);
            this.showThemeChangeNotification(theme);
        });
        
        // Creativity slider
        this.creativityInput.addEventListener('input', () => {
            this.creativityValue.textContent = this.creativityInput.value + '%';
            localStorage.setItem('creativity', this.creativityInput.value);
        });
        
        // Response length select
        this.responseLengthSelect.addEventListener('change', () => {
            localStorage.setItem('response_length', this.responseLengthSelect.value);
            Utils.showNotification(`Panjang respons diubah ke: ${Utils.getResponseLengthName(this.responseLengthSelect.value)}`);
        });
        
        // Model select
        this.modelSelect.addEventListener('change', () => {
            localStorage.setItem('model', this.modelSelect.value);
            Utils.showNotification(`Model AI diubah ke: ${Utils.getModelName(this.modelSelect.value)}`);
        });
    }
    
    /**
     * Load and apply user preferences from local storage
     */
    loadSavedPreferences() {
        // Load theme preference
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.themeSelect.value = savedTheme;
        
        // Load creativity setting
        const savedCreativity = localStorage.getItem('creativity');
        if (savedCreativity) {
            this.creativityInput.value = savedCreativity;
            this.creativityValue.textContent = savedCreativity + '%';
        }
        
        // Load response length
        const savedResponseLength = localStorage.getItem('response_length');
        if (savedResponseLength) {
            this.responseLengthSelect.value = savedResponseLength;
        }
        
        // Load model
        const savedModel = localStorage.getItem('model');
        if (savedModel) {
            this.modelSelect.value = savedModel;
        }
    }
    
    /**
     * Apply specified theme to the document
     */
    applyTheme(theme) {
        if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
        } else {
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');
        }
    }
    
    /**
     * Show notification for theme change
     */
    showThemeChangeNotification(theme) {
        let themeName;
        switch (theme) {
            case 'light': themeName = 'Terang'; break;
            case 'dark': themeName = 'Gelap'; break;
            case 'system': themeName = 'Sistem'; break;
            default: themeName = theme;
        }
        
        Utils.showNotification(`Tema diubah ke: ${themeName}`);
    }
    
    /**
     * Add subtle animations to UI elements
     */
    animateUIElements() {
        // Get all panels in sidebar
        const panels = document.querySelectorAll('.panel');
        
        // Apply staggered animation
        panels.forEach((panel, index) => {
            panel.style.opacity = '0';
            panel.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                panel.style.transition = 'all 0.4s ease-out';
                panel.style.opacity = '1';
                panel.style.transform = 'translateY(0)';
            }, 100 + (index * 100));
        });
    }
    
    /**
     * Create a floating tooltip
     */
    createTooltip(element, text) {
        element.setAttribute('data-tooltip', text);
        
        element.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.bottom + 5 + 'px';
            
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateY(-5px)';
            
            setTimeout(() => {
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translateY(0)';
            }, 10);
            
            this.setAttribute('data-tooltip-active', true);
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translateY(-5px)';
                
                setTimeout(() => {
                    tooltip.remove();
                }, 200);
            }
            
            this.removeAttribute('data-tooltip-active');
        });
    }
}

// Chat Functionality Class
class NothoaChat {
    constructor() {
        // DOM Elements
        this.chatContainer = document.getElementById('chat-container');
        this.userInput = document.getElementById('user-input');
        this.sendButton = document.getElementById('send-button');
        this.clearChatButton = document.getElementById('clear-chat');
        this.exportChatButton = document.getElementById('export-chat');
        
        // Configuration options
        this.modelSelect = document.getElementById('model');
        this.creativityInput = document.getElementById('creativity');
        this.responseLengthSelect = document.getElementById('response-length');
        
        // State
        this.isProcessing = false;
        this.chatHistory = this.loadChatHistory() || [];
        
        // Initialize events
        this.initEvents();
        
        // Restore history if available
        if (this.chatHistory.length > 0) {
            this.restoreChatHistory();
        }
    }
    
    /**
     * Initialize all event handlers
     */
    initEvents() {
        // Send message on button click
        this.sendButton.addEventListener('click', () => this.sendMessage());
        
        // Send message on Enter key
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Clear chat
        this.clearChatButton.addEventListener('click', () => this.clearChat());
        
        // Export chat
        this.exportChatButton.addEventListener('click', () => this.exportChat());
        
        // Auto-resize textarea
        this.userInput.addEventListener('input', () => {
            this.userInput.style.height = 'auto';
            this.userInput.style.height = (this.userInput.scrollHeight) + 'px';
        });
    }
    
    /**
     * Send message to server
     */
    async sendMessage() {
        const message = this.userInput.value.trim();
        if (!message || this.isProcessing) return;
        
        this.isProcessing = true;
        
        // Add user message to chat
        this.appendMessage(message, 'user');
        this.addToChatHistory('user', message);
        
        // Clear input and reset
        this.userInput.value = '';
        this.userInput.style.height = 'auto';
        this.sendButton.disabled = true;
        
        // Show typing indicator
        this.showTypingIndicator();

        try {
            const formData = new FormData();
            formData.append('user_input', message);
            formData.append('model', this.modelSelect.value);
            formData.append('creativity', this.creativityInput.value / 100);
            formData.append('response_length', this.responseLengthSelect.value);

            const response = await fetch('/send', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            
            // Hide typing indicator
            this.hideTypingIndicator();
            
            if (data.error) {
                this.appendMessage(data.error, 'bot');
                this.addToChatHistory('bot', data.error);
            } else {
                this.appendMessage(data.response, 'bot');
                this.addToChatHistory('bot', data.response);
            }
        } catch (error) {
            this.hideTypingIndicator();
            this.appendMessage('Maaf, terjadi kesalahan dalam memproses permintaan Anda.', 'bot');
            this.addToChatHistory('bot', 'Maaf, terjadi kesalahan dalam memproses permintaan Anda.');
        } finally {
            this.sendButton.disabled = false;
            this.isProcessing = false;
            
            // Scroll to bottom to show new message
            this.scrollToBottom();
        }
    }
    
    /**
     * Add a message to the chat container
     */
    appendMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        messageDiv.innerHTML = text;
        
        // Apply animation
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(10px)';
        
        this.chatContainer.appendChild(messageDiv);
        
        // Trigger CSS transition
        setTimeout(() => {
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
            messageDiv.style.transition = 'all 0.3s ease-out';
        }, 10);
        
        this.scrollToBottom();
    }
    
    /**
     * Show typing indicator in chat
     */
    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        this.chatContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }
    
    /**
     * Hide typing indicator
     */
    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    /**
     * Clear all chat messages
     */
    clearChat() {
        if (confirm('Apakah Anda yakin ingin menghapus semua percakapan?')) {
            this.chatContainer.innerHTML = '';
            this.chatHistory = [];
            this.saveChatHistory();
            this.appendMessage('Percakapan telah dihapus. Apa yang ingin Anda diskusikan sekarang?', 'bot');
            Utils.showNotification('Percakapan berhasil dihapus');
        }
    }
    
    /**
     * Export chat to text file
     */
    exportChat() {
        const messages = this.chatContainer.querySelectorAll('.message');
        let chatText = 'Percakapan Nothea AI\n';
        chatText += '=====================\n\n';
        
        const timestamp = new Date().toLocaleDateString('id-ID', {
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        chatText += `Diekspor pada: ${timestamp}\n\n`;
        
        messages.forEach(msg => {
            const isBot = msg.classList.contains('bot-message');
            const prefix = isBot ? 'Nothea: ' : 'Anda: ';
            chatText += prefix + msg.innerText + '\n\n';
        });
        
        const blob = new Blob([chatText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'nothea-percakapan-' + new Date().toISOString().slice(0, 10) + '.txt';
        a.click();
        URL.revokeObjectURL(url);
        
        Utils.showNotification('Percakapan berhasil diekspor');
    }
    
    /**
     * Add message to chat history
     */
    addToChatHistory(type, message) {
        this.chatHistory.push({
            type,
            message,
            timestamp: new Date().toISOString()
        });
        this.saveChatHistory();
    }
    
    /**
     * Save chat history to localStorage
     */
    saveChatHistory() {
        // Keep only last 50 messages to avoid exceeding storage limits
        const historyToSave = this.chatHistory.slice(-50);
        localStorage.setItem('nothea_chat_history', JSON.stringify(historyToSave));
    }
    
    /**
     * Load chat history from localStorage
     */
    loadChatHistory() {
        const history = localStorage.getItem('nothea_chat_history');
        return history ? JSON.parse(history) : null;
    }
    
    /**
     * Restore chat from history
     */
    restoreChatHistory() {
        this.chatContainer.innerHTML = ''; // Clear default messages
        
        this.chatHistory.forEach(item => {
            this.appendMessage(item.message, item.type);
        });
    }
    
    /**
     * Process file upload
     */
    async processFile(file) {
        if (this.isProcessing) return;
        
        // Validate file type
        if (file.type !== 'text/plain' && file.type !== 'application/pdf') {
            Utils.showNotification('Hanya file TXT dan PDF yang didukung', 'error');
            return;
        }
        
        this.isProcessing = true;
        document.getElementById('file-name').innerHTML = `<i class="fas fa-file"></i> ${file.name} (${Utils.formatFileSize(file.size)})`;
        
        // Show loading message
        this.appendMessage(`<i class="fas fa-spinner fa-spin"></i> Memproses file: ${file.name}...`, 'bot');
        
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const formData = {
                    content: e.target.result,
                    fileName: file.name,
                    fileType: file.type
                };

                const response = await fetch('/process_file', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();
                
                // Remove loading message
                this.chatContainer.removeChild(this.chatContainer.lastChild);
                
                if (data.success) {
                    this.appendMessage(`<strong>File: ${file.name}</strong><br>${data.message}`, 'bot');
                    this.addToChatHistory('bot', `File: ${file.name}\n${data.message}`);
                } else {
                    this.appendMessage(`<strong>Error:</strong> ${data.error || 'Gagal memproses file.'}`, 'bot');
                    this.addToChatHistory('bot', `Error: ${data.error || 'Gagal memproses file.'}`);
                }
            } catch (error) {
                // Remove loading message
                this.chatContainer.removeChild(this.chatContainer.lastChild);
                this.appendMessage('Maaf, terjadi kesalahan dalam memproses file.', 'bot');
                this.addToChatHistory('bot', 'Maaf, terjadi kesalahan dalam memproses file.');
            } finally {
                this.isProcessing = false;
                this.scrollToBottom();
            }
        };
        
        if (file.type === 'application/pdf') {
            reader.readAsArrayBuffer(file);
        } else {
            reader.readAsText(file);
        }
    }
    
    /**
     * Scroll chat container to bottom
     */
    scrollToBottom() {
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    }
    
    /**
     * Send a quick message (for quick action buttons)
     */
    quickMessage(message) {
        if (this.isProcessing) return;
        
        this.userInput.value = message;
        this.userInput.style.height = 'auto';
        this.userInput.style.height = (this.userInput.scrollHeight) + 'px';
        this.sendMessage();
    }
}

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize modules
    window.nothoaUI = new NothoaUI();
    window.nothoaChat = new NothoaChat();
    
    // Add tooltips to action buttons
    const actionButtons = document.querySelectorAll('.action-button');
    actionButtons.forEach(button => {
        if (button.title) {
            window.nothoaUI.createTooltip(button, button.title);
        }
    });
    
    // Set up global helper for quick messages
    window.sendQuickMessage = (message) => {
        window.nothoaChat.quickMessage(message);
    };
    
    // Set up file upload handler
    const fileUpload = document.getElementById('file-upload');
    if (fileUpload) {
        fileUpload.addEventListener('change', function() {
            if (this.files.length > 0) {
                window.nothoaChat.processFile(this.files[0]);
            }
        });
    }
});
