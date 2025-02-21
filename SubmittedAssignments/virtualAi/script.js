class VirtualAssistant extends HTMLElement { 
  static get observedAttributes() {
    return ["config","data", "data-question"];
  }

  constructor() {
    super();
    this.config = { ...this.defaultConfig };
    this.data = { ...this.defaultData };
    this.currentQuestionIndex = 0;
    console.log('constructor', this.data);
    const responseHandler = (event) => {
      this.data.question=event.detail.data.question
      console.log(event.detail)
      console.log('this.data.question',this.data.question)
      this.askQuestion();
    };
    this.addEventListener('nextQuetion', responseHandler);
  }

  defaultConfig = {
    assistantClass: "bg-dark shadow rounded-3",
    chatClass: "bg-light border-start overflow-auto",
    logoClass: "mb-3 p-2",
    videoClass: "w-100 mb-3 bg-danger rounded",
    micButtonClass: "btn btn-primary rounded-5 d-flex align-items-center justify-content-center mb-2",
    answerMicButtonClass: "btn btn-success rounded-5 d-flex align-items-center justify-content-center mt-2",
    cameraButtonClass: "btn btn-primary rounded-5",
    chatBubbleUserClass: "bg-info text-white",
    chatBubbleAIClass: "bg-danger text-white",
    micIcon: "mic.svg",
  };

  defaultData = {
    name: "Assistant",
    title: "Virtual Assistant",
    logo: "logo.jpg"
  };

  connectedCallback() {
    this.renderComponent();
    this.addEventListeners();
    this.askQuestion();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "config") {
      try {
        const userConfig = JSON.parse(newValue);
        this.config = { ...this.defaultConfig, ...userConfig };
      } catch (e) {
        console.error("Invalid config JSON:", e);
      }
    }  if (name === "data") {
      try {
        console.log('newValue',newValue)
        const userData = JSON.parse(newValue);
        this.data = { ...this.defaultData, ...userData.data };
        console.log("attributeChangedCallback", this.data);
      } catch (e) {
        console.error("Invalid data JSON:", e);
      }
    }
    this.renderComponent();
  }

  renderComponent() {
    this.innerHTML = '';  // Clear the existing content

    const container = document.createElement("div");
    container.classList.add("d-flex", "flex-row", "vh-75", "bg-light");

    const assistant = document.createElement("div");
    assistant.className = this.config.assistantClass;
    assistant.style.maxWidth = "600px";
    assistant.style.margin = "auto";
    assistant.style.display = "flex";
    assistant.style.flexDirection = "column";
    assistant.style.alignItems = "center";

    // Add Video Element
    this.videoElement = document.createElement("video");
    this.videoElement.className = this.config.videoClass;
    this.videoElement.setAttribute("autoplay", "");
    this.videoElement.setAttribute("playsinline", "");
    assistant.appendChild(this.videoElement);

    const micButton = document.createElement("button");
    micButton.id = "btn-mic";
    micButton.className = this.config.micButtonClass;
    micButton.textContent = "Question Mic";
    // assistant.appendChild(micButton);

    const answerMicButton = document.createElement("button");
    answerMicButton.id = "btn-answer-mic";
    answerMicButton.className = this.config.answerMicButtonClass;
    answerMicButton.textContent = "Answer Mic";
    assistant.appendChild(answerMicButton);

    const chatSection = document.createElement("div");
    chatSection.id = "chat-section";
    chatSection.className = this.config.chatClass;
    chatSection.style.width = "350px";
    chatSection.style.height = "75vh";
    chatSection.style.padding = "1rem";
    chatSection.style.overflowY = "auto";

    container.appendChild(assistant);
    container.appendChild(chatSection);
    this.appendChild(container);
}


  addEventListeners() {
    const btnMic = this.querySelector("#btn-mic");
    const btnAnswerMic = this.querySelector("#btn-answer-mic");
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    const answerRecognition = new SpeechRecognition();
    answerRecognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      this.addChatMessage(`${this.data?.UserDetails?.name || 'User'}: ${transcript}`, false);
        if(transcript){
        const customeEvent = (new CustomEvent("submit", {
          bubbles: true,
          cancelable: true,
          detail: {
           data:transcript,
           datamodel:'test-quetions'
          }
        }))
        this.dispatchEvent(customeEvent);
      }
    };

    //btnMic.addEventListener("click", () => recognition.start());
    btnAnswerMic.addEventListener("click", () => answerRecognition.start());
  }

  addChatMessage(message, isAI = false) {
    const chatSection = this.querySelector("#chat-section");
    const chatMessage = document.createElement("div");
    chatMessage.classList.add("d-flex", "mb-3", isAI ? "justify-content-start" : "justify-content-end");

    const bubble = document.createElement("div");
    bubble.className = `p-2 fs-6 ${isAI ? this.config.chatBubbleAIClass : this.config.chatBubbleUserClass}`;
    bubble.textContent = message;
    chatMessage.style.width="90%"
    chatMessage.appendChild(bubble);
    chatSection.appendChild(chatMessage);
    chatSection.scrollTop = chatSection.scrollHeight;
  }

  speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  }
  

  

  askQuestion() {
    if (this.currentQuestionIndex === 0) {
        this.startCamera(); // Start the camera when the interview begins
    }
    
    const questionObj = this.data.question;
    if (!questionObj) return;
    
    const assistantMessage = `Assistant: ${questionObj}`;
    this.currentQuestionIndex++;
    this.addChatMessage(assistantMessage, true);
    this.speak(questionObj);
}
startCamera() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
          .then(stream => {
              this.videoElement.srcObject = stream;
              this.cameraStream = stream;
          })
          .catch(error => {
              console.error("Error accessing camera:", error);
          });
  }
}

stopCamera() {
  if (this.cameraStream) {
      this.cameraStream.getTracks().forEach(track => track.stop());
  }
}


}



customElements.define("virtual-assistant", VirtualAssistant);
