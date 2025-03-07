class VirtualAssistant extends HTMLElement {
  static get observedAttributes() {
    return ["config", "data", "data-question"];
  }

  constructor() {
    super();
    this.config = { ...this.defaultConfig };
    this.data = { ...this.defaultData };
    this.currentQuestionIndex = 0;
    this.userAnswer = null; // Initialize userAnswer
    const responseHandler = (event) => {
      this.data.question = event.detail.data.question;
      this.askQuestion();
    };
    this.addEventListener('nextQuetion', responseHandler);
  }

  defaultConfig = {
    assistantClass: "p-3", // Added padding for better visual spacing
    chatClass: "bg-body-tertiary border-start overflow-auto p-3", // Changed to bg-body-tertiary for better theme consistency, added padding
    logoClass: "mb-3 p-2 d-flex justify-content-center align-items-center", // Centered the logo
    videoClass: "w-100 mb-3 rounded", // Kept as is, looks good
    micButtonClass: "btn btn-primary rounded-circle shadow d-flex align-items-center justify-content-center mb-2", // Changed to rounded-circle and added shadow for a more polished look
    answerMicButtonClass: "btn btn-success rounded-circle shadow d-flex align-items-center justify-content-center mt-2 d-none", // Same as above for consistency
    cameraButtonClass: "btn btn-primary rounded-circle shadow", // Consistent styling
    chatBubbleUserClass: "bg-primary-subtle text-dark rounded p-2 mb-2", // More subtle user bubble, better readability
    chatBubbleAIClass: "bg-info-subtle text-dark rounded p-2 mb-2" // More subtle AI bubble, better readability
};

  defaultData = {
    name: "Assistant",
    title: "Virtual Assistant",
    logo: "logo.jpg",
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
    }
    if (name === "data") {
      try {
        const userData = JSON.parse(newValue);
        this.data = userData;
        this.askQuestion();
      } catch (e) {
        console.error("Invalid data JSON:", e);
      }
    }
    this.renderComponent();
  }

  renderComponent() {
    this.innerHTML = '';

    const container = document.createElement("div");
    container.classList.add("d-flex", "flex-row", "vh-75", "bg-light");

    const assistant = document.createElement("div");
    assistant.className = this.config.assistantClass;
    assistant.style.maxWidth = "600px";
    assistant.style.margin = "auto";
    assistant.style.display = "flex";
    assistant.style.flexDirection = "column";
    assistant.style.alignItems = "center";

    this.videoElement = document.createElement("video");
    this.videoElement.className = this.config.videoClass;
    this.videoElement.setAttribute("autoplay", "");
    this.videoElement.setAttribute("playsinline", "");
    assistant.appendChild(this.videoElement);

    const chatSection = document.createElement("div");
    chatSection.id = "chat-section";
    chatSection.className = this.config.chatClass;
    chatSection.style.width = "350px";
    chatSection.style.height = "75vh";
    chatSection.style.padding = "1rem";
    chatSection.style.overflowY = "auto";
    chatSection.style.display = "flex";
    chatSection.style.flexDirection = "column";

    const answerMicButton = document.createElement("button");
    answerMicButton.id = "btn-answer-mic";
    answerMicButton.className = this.config.answerMicButtonClass;
    answerMicButton.textContent = "Give Answer";
    answerMicButton.style.display = 'none';
    this.answerMicButton = answerMicButton;

    const submitAnswerButton = document.createElement("button");
    submitAnswerButton.id = "btn-submit-answer";
    submitAnswerButton.className = "btn btn-success rounded-5 mt-2";
    submitAnswerButton.textContent = "Submit Answer";
    this.submitAnswerButton = submitAnswerButton;
    submitAnswerButton.style.display = 'none';

    this.chatSection = chatSection;
    container.appendChild(assistant);
    container.appendChild(chatSection);
    chatSection.appendChild(answerMicButton);
    chatSection.appendChild(submitAnswerButton);
    this.appendChild(container);
  }

  addEventListeners() {
    const btnAnswerMic = this.querySelector("#btn-answer-mic");
    const btnSubmitAnswer = this.querySelector("#btn-submit-answer");
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const answerRecognition = new SpeechRecognition();
     answerRecognition.continuous = true;
    let currentTranscript = "";
    answerRecognition.onresult = (event) => {
      const transcript = event.results[ event.results.length-1][0].transcript;
        this.addChatMessage(`${this.data?.UserDetails?.name || 'User'}: ${transcript.trim()}`, false);
        currentTranscript += transcript + " ";
        btnSubmitAnswer.style.display = 'block';
    };
  
    answerRecognition.onend = () => {
      if (currentTranscript.trim()) {
        this.userAnswer = currentTranscript.trim();
      }
    };
  
    btnAnswerMic.addEventListener("click", () => {
      console.log('btnAnswerMic clicked')
      this.isAnsGiven=false
      btnAnswerMic.style.display = 'none';
      btnSubmitAnswer.style.display = 'block';
      answerRecognition.start();
    });
  
    btnSubmitAnswer.addEventListener("click", () => {
      answerRecognition.stop();
      if (currentTranscript.trim()) {
        const customeEvent = (new CustomEvent("submit", {
          bubbles: true,
          cancelable: true,
          detail: {
            data: currentTranscript.trim(),
            datamodel: 'test-quetions'
          }
        }));
        this.dispatchEvent(customeEvent);
        btnSubmitAnswer.style.display = 'none';
      }
      this.userAnswer = null;
      currentTranscript = "";
    });
  }

  addChatMessage(message, isAI = false) {
    const chatMessage = document.createElement("div");
    chatMessage?.classList?.add("d-flex", "mb-3", isAI ? "justify-content-start" : "justify-content-end ms-3");

    const bubble = document.createElement("div");
    bubble.className = `p-2 fs-6 ${isAI ? this.config.chatBubbleAIClass : this.config.chatBubbleUserClass}`;
    bubble.textContent = message;
    chatMessage.style.width = "90%";
    chatMessage.appendChild(bubble);

    this.chatSection.insertBefore(chatMessage, this.answerMicButton);

    this.chatSection.scrollTop = this.chatSection.scrollHeight;
  }

  speak(text) {
    const btnAnswerMic = this.querySelector("#btn-answer-mic");
    const btnSubmitAnswer = this.querySelector("#btn-submit-answer");
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.onstart = () => {
      btnAnswerMic?.style?.display = 'none';
      this.submitAnswerButton.style.display = 'none';
    };
    utterance.onend = () => {
      btnAnswerMic.click();
      this.answerMicButton.style.display = 'block';
      this.submitAnswerButton.style.display = 'none';
    };
    window.speechSynthesis.speak(utterance);
  }

  askQuestion() {
    if (this.currentQuestionIndex === 0) {
      this.startCamera();
    }
    const btnAnswerMic = this.querySelector("#btn-answer-mic");
    btnAnswerMic.style.display = 'none';
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