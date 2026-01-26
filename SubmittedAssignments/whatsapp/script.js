class WhatsAppDashboard extends HTMLElement {
  constructor() {
    super();
    this.instances = [
      {
        brand: "I am Citizen",
        instanceEndPoint: "https://wapi.iamcitizen.in/api",
        token: "$2b$10$6ASZ5xQU1TajeMJO0_V0Quvp7MvlgrmYIeHY32AX1Ayhs9U542Xby",
        instanceName: "9049508514",
        mobile: "9049508514",
        dockerApiUrl: "https://whatsapp.apnasite.in/docker/",
        dockerName: 'whatsapp1'
      },
      {
        brand: "Happy home - Maruti Sir",
        instanceEndPoint: "https://whatsapp1.apnasite.in/api",
        token: "$2b$10$tN1bljzsVQj79UUIODheZ.rsiLmzbFDjT4fu4SE6PntPj1.yYJjwW",
        instanceName: "hh",
        mobile: "8600006783",
        dockerApiUrl: "https://whatsapp.apnasite.in/docker/",
        dockerName: 'whatsapp1'
      },
      {
        brand: "Happy home - Maruti Sir",
        instanceEndPoint: "https://whatsapp2.apnasite.in/api",
        token: "$2b$10$K5jrVqoHSyDxr9SCmmZybO52whYBqnwBe_5.hPSqzfchQc.Vm68m6",
        instanceName: "hh",
        mobile: "8390055038",
        dockerApiUrl: "https://whatsapp.apnasite.in/docker/"
      },
      {
        brand: "Happy home - Maruti Sir",
        instanceEndPoint: "https://whatsapp3.apnasite.in/api",
        token: "$2b$10$dHWv_GQv3FnADD60z5ZibOZvIpRNRGf2SOBvI.p658Mr2xjh1UiVm",
        instanceName: "hh",
        mobile: "8180806337",
        dockerApiUrl: "https://whatsapp.apnasite.in/docker/"
      },
      {
        brand: "ApnaGuru - Vilas",
        instanceEndPoint: "https://whatsapp6.apnasite.in/api",
        token: "$2b$10$BCkpOb3Nctb2.CldiKoyiO.J1JlRvQZP5IhNAEZfAC6q4L9aJ8Viy",
        instanceName: "apnaguru2",
        mobile: "9049508514",
        dockerApiUrl: "https://whatsapp4.apnasite.in/docker/"
      },
      {
        brand: "ApnaGuru - Kapil",
        instanceEndPoint: "https://whatsapp7.apnasite.in/api",
        token: "$2b$10$04ARn5.1ujuwcA0dwUb9f.fgWLhHDxPtvQXHVoLC2XtiViI0UqBJG",
        instanceName: "apnaguru3",
        mobile: "8805802919",
        dockerApiUrl: "https://whatsapp4.apnasite.in/docker/"
      },
      {
        brand: "ApnaGuru - Jyoti",
        instanceEndPoint: "https://whatsapp8.apnasite.in/api",
        token: "$2b$10$3G4Z4V4gpnEGLNWfmJ0YNOe7ZkpTXN2QGSTXgGqseg31EotRyPzV2",
        instanceName: "apnaguru4",
        mobile: "8626012919",
        dockerApiUrl: "https://whatsapp4.apnasite.in/docker/"
      },
      {
        brand: "ApnaGuru - Sakshi",
        instanceEndPoint: "https://whatsapp9.apnasite.in/api",
        token: "$2b$10$_TTjnP74UfayCbwAa1HY3eCN3_NI1HpjAZrbbf5Oqr8_qLQ9EP2cG",
        instanceName: "apnaguru5",
        mobile: "9607382919",
        dockerApiUrl: "https://whatsapp4.apnasite.in/docker/"
      },
      {
        brand: "ApnaGuru - Kalpesh",
        instanceEndPoint: "https://whatsapp10.apnasite.in/api",
        token: "$2b$10$R3hCHf1DwvojbZwYc8iSP.QUen5Bq72aGmhIRPceVqv5PKE6jqoZO",
        instanceName: "apnaguru6",
        mobile: "7840974679",
        dockerApiUrl: "https://whatsapp4.apnasite.in/docker/"
      },
      {
        brand: "ApnaSite - Vilas",
        instanceEndPoint: "https://whatsapp4.apnasite.in/api",
        token: "$2b$10$Xt.AdDYeAlsyu0elWxnLx.nbUGMLCGOm_ZQU7Nh7dA6vjB9r1GKPm",
        instanceName: "apnaguru1",
        mobile: "9175546005",
        dockerApiUrl: "https://whatsapp4.apnasite.in/docker/"
      },
      {
        brand: "ApnaSite - Vilas (New)",
        instanceEndPoint: "https://whatsapp14.apnasite.in/api",
        token: "$2b$10$D1IWfb4kG303wDyd4DCpHuI_oK50ygwNeDBA_ESeIy.3Xc029cq6u",
        instanceName: "apnasite4",
        mobile: "9156380431",
        dockerApiUrl: "https://whatsapp4.apnasite.in/docker/"
      },
      {
        brand: "ApnaSite - Monica",
        instanceEndPoint: "https://whatsapp11.apnasite.in/api",
        token: "$2b$10$mdWXTq5cwOkNGCbRi7wrJ.et8c66vCFa9zyZGfR1qOgX3JobLJpVC",
        instanceName: "apnasite1",
        mobile: "7841951409",
        dockerApiUrl: "https://whatsapp4.apnasite.in/docker/"
      },
      {
        brand: "ApnaSite - Vaibhav",
        instanceEndPoint: "https://whatsapp12.apnasite.in/api",
        token: "$2b$10$EPz2g2WbE25mQrByePdBHeBOF2XftI2GRvr_eEL2h3tTUb.Gmgwja",
        instanceName: "apnasite2",
        mobile: "8482994632",
        dockerApiUrl: "https://whatsapp4.apnasite.in/docker/"
      },
      {
        brand: "ApnaSite - Archana",
        instanceEndPoint: "https://whatsapp13.apnasite.in/api",
        token: "$2b$10$UYsaJaNBMWTHcVIiZgNq2ef5Kxra2jCy2WOJwi3q2vKohqlg6e8PS",
        instanceName: "apnasite3",
        mobile: "8625908511",
        dockerApiUrl: "https://whatsapp4.apnasite.in/docker/"
      },
      {
        brand: "Anvi's Kitchen - Ashwini",
        instanceEndPoint: "https://whatsapp5.apnasite.in/api",
        token: "$2b$10$ZQLkzvU_O15Xj5S3fPiacOeK2Vxx4qXk98.KedgLPXe9pjZiANWIm",
        instanceName: "anviskitchen1",
        mobile: "8999412474",
        dockerApiUrl: "https://whatsapp4.apnasite.in/docker/"
      }
    ];
  }

  connectedCallback() {
    this.render();
  }

  async checkStatus(index, showAlert = false) {
    const instance = this.instances[index];
    try {
      const response = await fetch(`${instance.instanceEndPoint}/${instance.instanceName}/status-session`, {
        headers: { Authorization: `Bearer ${instance.token}` }
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();

      const statusBadge = this.querySelector(`#status-badge-${index}`);
      if (statusBadge) {
        statusBadge.textContent = data.status;
        statusBadge.className = `badge ${this.getBadgeClass(data.status)}`;
      }

      if (data.status === "QRCODE") {
        this.showQRCode(data.qrcode);
        this.pollStatus(index);
      } else if (data.status === "CONNECTED" || data.status === "CLOSED") {
        console.log(`Status: ${JSON.stringify(data)}`);
      } else {
        this.pollStatus(index);
      }
    } catch (error) {
      console.error(`Error checking status for instance ${index}:`, error);

      const statusBadge = this.querySelector(`#status-badge-${index}`);
      if (statusBadge) {
        statusBadge.textContent = "API ERROR";
        statusBadge.className = "position-absolute top-0 end-0 mt-3 me-3 badge bg-danger";
      }
    }
  }

  pollStatus(index) {
    const instance = this.instances[index];
    const interval = setInterval(async () => {
      const response = await fetch(`${instance.instanceEndPoint}/${instance.instanceName}/status-session`, {
        headers: { Authorization: `Bearer ${instance.token}` }
      });
      const data = await response.json();

      const statusBadge = this.querySelector(`#status-badge-${index}`);
      if (statusBadge) {
        statusBadge.textContent = data.status;
        statusBadge.className = `badge ${this.getBadgeClass(data.status)}`;
      }

      if (data.status === "CONNECTED" || data.status === "CLOSED") {
        clearInterval(interval);
        alert(`WhatsApp ${data.status} for ${instance.mobile}`);
      }
    }, 1000);
  }

  showQRCode(qrCodeUrl) {
    const qrPopup = document.createElement("div");
    qrPopup.innerHTML = `
      <div style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;">
        <div style="background:white;padding:20px;border-radius:10px;text-align:center;">
          <h3>Scan QR Code</h3>
          <img src="${qrCodeUrl}" alt="QR Code" style="width:250px;height:250px;">
          <br><br>
          <button onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
      </div>
    `;
    document.body.appendChild(qrPopup);
  }

  async startSession(index) {
    const instance = this.instances[index];
    const response = await fetch(`${instance.instanceEndPoint}/${instance.instanceName}/start-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${instance.token}` },
      body: JSON.stringify({ webhook: "", waitQrCode: false })
    });
    const data = await response.json();
    alert(`Start Session: ${JSON.stringify(data)}`);
    this.checkStatus(index); // Check status after starting the session
  }
  getBadgeClass(status) {
    switch (status) {
      case "CONNECTED":
        return "position-absolute top-0 end-0 mt-3 me-3 badge bg-success";
      case "CLOSED":
        return "position-absolute top-0 end-0 mt-3 me-3 badge bg-danger";
      case "QRCODE":
        return "position-absolute top-0 end-0 mt-3 me-3 badge bg-warning";
      default:
        return "position-absolute top-0 end-0 mt-3 me-3 badge bg-secondary";
    }
  }

  async restartSession(index) {
    const instance = this.instances[index];

    // Close WhatsApp session first
    const closeResponse = await fetch(`${instance.instanceEndPoint}/${instance.instanceName}/close-session`, {
      method: "POST",
      headers: { Authorization: `Bearer ${instance.token}` }
    });

    if (closeResponse.ok) {
      alert(`WhatsApp session closed for ${instance.instanceName}`);
    } else {
      alert(`Failed to close WhatsApp session for ${instance.instanceName}`);
      return;
    }

    // Wait for some time before starting the session again
    setTimeout(() => {
      this.startSession(index);
    }, 5000); // Wait for 5 seconds
  }

  async sendMessage(index) {
    // Open the chat modal component, passing instance info
    const instance = this.instances[index];
    let chatModal = document.querySelector('whatsapp-chat-modal');
    if (!chatModal) {
      chatModal = document.createElement('whatsapp-chat-modal');
      document.body.appendChild(chatModal);
    }
    chatModal.open(instance);
  }

  render() {
    this.instances.map((instance, index) => this.checkStatus(index));
    this.innerHTML = `
      <style>
      .container { padding: 20px; }
      .card { margin-bottom: 20px; }
      </style>
      <div class="container">
      <div class="row">
        ${this.instances.map((instance, index) => `
        <div class="col-md-4">
          <div class="card">
          <div class="card-body">
            <h5 class="card-title">${instance.brand}</h5>
            <h6 class="card-title">${instance.mobile}</h6>
            <p class="card-text">Endpoint: ${instance.instanceEndPoint}</p>
            <a href="${instance.dockerApiUrl}" target="_new" class="d-block card-link">Check Docker Status</a>
            <span id="status-badge-${index}" class="position-absolute top-0 end-0 mt-3 me-3 badge bg-secondary">UNKNOWN</span>
            <button class="btn btn-primary m-1" onclick="document.querySelector('whatsapp-dashboard').checkStatus(${index})">Check Status</button>
            <button class="btn btn-success m-1" onclick="document.querySelector('whatsapp-dashboard').startSession(${index})">Start Session</button>
            <button class="btn btn-warning m-1" onclick="document.querySelector('whatsapp-dashboard').restartSession(${index})">Restart Session</button>
            <button class="btn btn-info m-1" onclick="document.querySelector('whatsapp-dashboard').sendMessage(${index})">Send Message</button>
          </div>
          </div>
        </div>
        `).join('')}
      </div>
      </div>
    `;
  }
}

customElements.define("whatsapp-dashboard", WhatsAppDashboard);

// WhatsApp Chat Modal Component

class WhatsAppChatModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.instance = null;
    this.chats = [];
    this.selectedChat = null;
    this.messages = [];
    this.groups = [];
    this.pollInterval = null;
  }

  open(instance) {
    this.instance = instance;
    this.selectedChat = null;
    this.chats = [];
    this.groups = [];
    this.messages = [];
    this.render();
    this.style.display = 'block';
    this.loadChats();
  }

  close() {
    this.style.display = 'none';
    if (this.pollInterval) clearInterval(this.pollInterval);
  }

  async loadChats() {
    // WPPConnect API: POST /{session}/list-chats
    try {
      const res = await fetch(`${this.instance.instanceEndPoint}/${this.instance.instanceName}/list-chats`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${this.instance.token}` },
        body: JSON.stringify({})
      });
      const data = await res.json();
      // data.response is the array of chats
      const chats = Array.isArray(data.response) ? data.response : [];
      this.chats = chats.filter(c => !c.isGroup);
      this.groups = chats.filter(c => c.isGroup);
      this.render();
    } catch (e) {
      this.chats = [];
      this.groups = [];
      this.render();
    }
  }

  async loadMessages(chatId) {
    // WPPConnect API: GET /{session}/all-messages-in-chat/{phone}
    try {
      const res = await fetch(`${this.instance.instanceEndPoint}/${this.instance.instanceName}/all-messages-in-chat/${encodeURIComponent(chatId)}`, {
        headers: { Authorization: `Bearer ${this.instance.token}` }
      });
      const data = await res.json();
      // data.response is the array of messages
      this.messages = Array.isArray(data.response) ? data.response : [];
      this.render();
      this.scrollToBottom();
    } catch (e) {
      this.messages = [];
      this.render();
    }
  }

  selectChat(chat) {
    this.selectedChat = chat;
    this.messages = [];
    this.render();
    this.loadMessages(chat.id);
    if (this.pollInterval) clearInterval(this.pollInterval);
    this.pollInterval = setInterval(() => this.loadMessages(chat.id), 3000);
  }

  async sendMessage() {
    const input = this.shadowRoot.querySelector('#send-input');
    const msg = input.value.trim();
    if (!msg || !this.selectedChat) return;
    input.value = '';
    // WPPConnect API: POST /{session}/send-message
    await fetch(`${this.instance.instanceEndPoint}/${this.instance.instanceName}/send-message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${this.instance.token}` },
      body: JSON.stringify({
        phone: this.selectedChat.id,
        message: msg
      })
    });
    setTimeout(() => this.loadMessages(this.selectedChat.id), 500);
  }

  scrollToBottom() {
    setTimeout(() => {
      const el = this.shadowRoot.querySelector('.chat-messages');
      if (el) el.scrollTop = el.scrollHeight;
    }, 100);
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .modal-bg { position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.5);z-index:10000;display:flex;align-items:center;justify-content:center; }
        .modal { background:#fff;width:90vw;height:95vh;display:flex;border-radius:10px;overflow:hidden;box-shadow:0 0 20px #0003; }
        .sidebar { width:270px;background:#f7f7f7;border-right:1px solid #eee;overflow-y:auto; }
        .sidebar h4 { margin:16px 0 8px 16px;font-size:1.1em;color:#555; }
        .chat-list, .group-list { list-style:none;padding:0;margin:0; }
        .chat-list li, .group-list li { padding:12px 16px;cursor:pointer;display:flex;align-items:center; }
        .chat-list li.selected, .group-list li.selected { background:#e0f7fa; }
        .chat-list li:hover, .group-list li:hover { background:#f0f0f0; }
        .main { flex:1;display:flex;flex-direction:column; }
        .chat-header { padding:16px;border-bottom:1px solid #eee;background:#fafafa; }
        .chat-messages { flex:1;overflow-y:auto;padding:16px;background:#f9f9f9; }
        .message { margin-bottom:12px;max-width:70%;padding:10px 14px;border-radius:16px;word-break:break-word; }
        .sent { background:#d1f5d3;align-self:flex-end; }
        .received { background:#fff;border:1px solid #eee;align-self:flex-start; }
        .chat-input { display:flex;padding:12px;border-top:1px solid #eee;background:#fafafa; }
        #send-input { flex:1;padding:8px 12px;border-radius:20px;border:1px solid #ccc;outline:none; }
        #send-btn { margin-left:8px;padding:8px 20px;border-radius:20px;border:none;background:#25d366;color:#fff;font-weight:bold;cursor:pointer; }
        #close-btn { position:absolute;top:10px;right:20px;background:none;border:none;font-size:1.5em;cursor:pointer;color:#888; }
      </style>
      <div class="modal-bg" style="display:flex;">
        <div class="modal">
          <div class="sidebar">
            <h4>Chats</h4>
            <ul class="chat-list">
              ${this.chats.map(chat => `
                <li class="${this.selectedChat && this.selectedChat.id === chat.id ? 'selected' : ''}" onclick="this.getRootNode().host.selectChatById('${chat.id}')">
                  <span>${chat.name || chat.id}</span>
                </li>
              `).join('')}
            </ul>
            <h4>Groups</h4>
            <ul class="group-list">
              ${this.groups.map(group => `
                <li class="${this.selectedChat && this.selectedChat.id === group.id ? 'selected' : ''}" onclick="this.getRootNode().host.selectChatById('${group.id}')">
                  <span>${group.name || group.id}</span>
                </li>
              `).join('')}
            </ul>
          </div>
          <div class="main">
            <button id="close-btn" title="Close">&times;</button>
            <div class="chat-header">
              ${this.selectedChat ? `<b>${this.selectedChat.name || this.selectedChat.id}</b>` : 'Select a chat or group'}
            </div>
            <div class="chat-messages" style="display:flex;flex-direction:column;">
              ${this.selectedChat ? this.messages.map(msg => `
                <div class="message ${msg.fromMe ? 'sent' : 'received'}">${msg.body}</div>
              `).join('') : '<div style="color:#aaa;text-align:center;margin-top:40px;">No chat selected</div>'}
            </div>
            <div class="chat-input">
              <input id="send-input" type="text" placeholder="Type a message..." ${!this.selectedChat ? 'disabled' : ''} />
              <button id="send-btn" ${!this.selectedChat ? 'disabled' : ''}>Send</button>
            </div>
          </div>
        </div>
      </div>
    `;
    this.shadowRoot.querySelector('#close-btn').onclick = () => this.close();
    this.shadowRoot.querySelector('#send-btn').onclick = () => this.sendMessage();
    this.shadowRoot.querySelector('#send-input').onkeydown = (e) => {
      if (e.key === 'Enter') this.sendMessage();
    };
  }

  selectChatById(id) {
    const chat = [...this.chats, ...this.groups].find(c => c.id === id);
    if (chat) this.selectChat(chat);
  }
}

customElements.define('whatsapp-chat-modal', WhatsAppChatModal);