class WhatsAppDashboard extends HTMLElement {
  constructor() {
    super();
    this.instances = [
      {
        brand: "Happy home - Maruti Sir",
        instanceEndPoint: "https://whatsapp1.apnasite.in/api",
        token: "$2b$10$tN1bljzsVQj79UUIODheZ.rsiLmzbFDjT4fu4SE6PntPj1.yYJjwW",
        instanceName: "hh",
        mobile: "8600006783",
        dockerApiUrl: "https://dev.erp.apnasite.in/docker"
      },
      {
        brand: "Happy home - Maruti Sir",
        instanceEndPoint: "https://whatsapp2.apnasite.in/api",
        token: "$2b$10$K5jrVqoHSyDxr9SCmmZybO52whYBqnwBe_5.hPSqzfchQc.Vm68m6",
        instanceName: "hh",
        mobile: "8390055038",
        dockerApiUrl: "https://dev.erp.apnasite.in/docker"
      },
      {
        brand: "Happy home - Maruti Sir",
        instanceEndPoint: "https://whatsapp3.apnasite.in/api",
        token: "$2b$10$dHWv_GQv3FnADD60z5ZibOZvIpRNRGf2SOBvI.p658Mr2xjh1UiVm",
        instanceName: "hh",
        mobile: "8180806337",
        dockerApiUrl: "https://dev.erp.apnasite.in/docker"
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

  async checkStatus(index) {
    const instance = this.instances[index];
    const response = await fetch(`${instance.instanceEndPoint}/${instance.instanceName}/status-session`, {
      headers: { Authorization: `Bearer ${instance.token}` }
    });
    const data = await response.json();

    if (data.status === "QRCODE") {
      this.showQRCode(data.qrcode);
      this.pollStatus(index);
    } else {
      alert(`Status: ${JSON.stringify(data)}`);
    }
  }

  pollStatus(index) {
    const instance = this.instances[index];
    const interval = setInterval(async () => {
      const response = await fetch(`${instance.instanceEndPoint}/${instance.instanceName}/status-session`, {
        headers: { Authorization: `Bearer ${instance.token}` }
      });
      const data = await response.json();

      if (data.status === "CONNECTED") {
        clearInterval(interval);
        alert(`WhatsApp Connected for ${instance.mobile}`);
      }
    }, 1000);
  }

  showQRCode(qrCodeUrl) {
    const qrPopup = document.createElement("div");
    qrPopup.innerHTML = `
      <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;">
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
  }

  async restartSession(index) {
    const instance = this.instances[index];

    // Restart Docker Container first
    const restartResponse = await fetch(`${instance.dockerApiUrl}/restart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ containerId: instance.containerId })
    });

    if (restartResponse.ok) {
      alert(`Docker container restarted for ${instance.instanceName}`);
    } else {
      alert(`Failed to restart Docker container for ${instance.instanceName}`);
      return;
    }

    // Restart WhatsApp session after Docker restart
    await fetch(`${instance.instanceEndPoint}/${instance.instanceName}/close-session`, {
      method: "POST",
      headers: { Authorization: `Bearer ${instance.token}` }
    });

    setTimeout(() => this.startSession(index), 2000);
  }

  async sendMessage(index) {
    const instance = this.instances[index];
    const phone = prompt("Enter phone number (with country code):");
    const message = prompt("Enter your message:");
    if (!phone || !message) return;

    const response = await fetch(`${instance.instanceEndPoint}/${instance.instanceName}/send-message`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${instance.token}` },
      body: JSON.stringify({ phone, isGroup: false, isNewsletter: false, isLid: false, message })
    });
    const data = await response.json();
    alert(`Message Sent: ${JSON.stringify(data)}`);
  }

  render() {
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
                  <p class="card-text">Docker API: ${instance.dockerApiUrl}</p>
                  <button class="btn btn-primary m-1" onclick="document.querySelector('whatsapp-dashboard').checkStatus(${index})">Check Status</button>
                  <button class="btn btn-success m-1" onclick="document.querySelector('whatsapp-dashboard').startSession(${index})">Start Session</button>
                  
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

// <button class="btn btn-warning m-1" onclick="document.querySelector('whatsapp-dashboard').restartSession(${index})">Restart Session</button>

customElements.define("whatsapp-dashboard", WhatsAppDashboard);