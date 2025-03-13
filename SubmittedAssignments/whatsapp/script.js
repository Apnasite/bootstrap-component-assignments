class WhatsAppDashboard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.instances = [
      {
        barnd:"Happy home ",
        instanceEndPoint: "https://whatsapp1.apnasite.in/api",
        token: "$2b$10$tN1bljzsVQj79UUIODheZ.rsiLmzbFDjT4fu4SE6PntPj1.yYJjwW",
        instanceName: "hh",
         mobile:"8600006783"
      },
      {
        barnd:"Happy home ",
        instanceEndPoint: "https://whatsapp2.apnasite.in/api",
        token: "$2b$10$K5jrVqoHSyDxr9SCmmZybO52whYBqnwBe_5.hPSqzfchQc.Vm68m6",
        instanceName: "hh",
         mobile:"8390055038"
      },
      {
        barnd:"Happy home ",
        instanceEndPoint: "https://whatsapp3.apnasite.in/api",
        token: "$2b$10$dHWv_GQv3FnADD60z5ZibOZvIpRNRGf2SOBvI.p658Mr2xjh1UiVm",
        instanceName: "hh",
        mobile:"8180806337"
      },
      {
        barnd:"Apnagruru",
        instanceEndPoint: "https://whatsapp6.apnasite.in/api",
        token: "$2b$10$BCkpOb3Nctb2.CldiKoyiO.J1JlRvQZP5IhNAEZfAC6q4L9aJ8Viy",
        instanceName: "apnaguru2",
         mobile:"9049508514"
      },
      {
        barnd:"Apnagruru",
        instanceEndPoint: "https://whatsapp10.apnasite.in/api",
        token: "$2b$10$R3hCHf1DwvojbZwYc8iSP.QUen5Bq72aGmhIRPceVqv5PKE6jqoZO",
        instanceName: "apnaguru6",
        mobile:"7840974679"
      },
      {
        barnd:"Apnasite",
        instanceEndPoint: "https://whatsapp4.apnasite.in/api",
        token: "$2b$10$Xt.AdDYeAlsyu0elWxnLx.nbUGMLCGOm_ZQU7Nh7dA6vjB9r1GKPm",
        instanceName: "apnaguru1",
        mobile:"9175546005"
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
    alert(`Status: ${JSON.stringify(data)}`);
  }

  async startSession(index) {
    const instance = this.instances[index];
    const response = await fetch(`${instance.instanceEndPoint}/${instance.instanceName}/start-session`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
        Authorization: `Bearer ${instance.token}` 
      },
      body: JSON.stringify({ webhook: "", waitQrCode: false })
    });
    const data = await response.json();
    alert(`Start Session: ${JSON.stringify(data)}`);
  }

  async sendMessage(index) {
    const instance = this.instances[index];
    const phone = prompt("Enter phone number (with country code):");
    const message = prompt("Enter your message:");
    if (!phone || !message) return;

    const response = await fetch(`${instance.instanceEndPoint}/${instance.instanceName}/send-message`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
        Authorization: `Bearer ${instance.token}` 
      },
      body: JSON.stringify({ phone, isGroup: false, isNewsletter: false, isLid: false, message })
    });
    const data = await response.json();
    alert(`Message Sent: ${JSON.stringify(data)}`);
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
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
                  <h5 class="card-title">${instance.barnd}</h5>
                  <h6 class="card-title">${instance.mobile}</h6>
                  <p class="card-text">Endpoint: ${instance.instanceEndPoint}</p>
                  <button class="btn btn-primary" onclick="this.getRootNode().host.checkStatus(${index})">Check Status</button>
                  <button class="btn btn-success" onclick="this.getRootNode().host.startSession(${index})">Start Session</button>
                  <button class="btn btn-info" onclick="this.getRootNode().host.sendMessage(${index})">Send Message</button>
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
