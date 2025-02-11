class CardComponent extends HTMLElement {
    static observedAttributes = ["config", "data"];

    defaultConfig = {
        cardContainerClass: "card my-3",
        cardBodyClass: "card-body",
        imageClass: "card-img-top",
        titleClass: "card-title",
        subTitleClass: "card-subtitle my-3",
        textClass: "card-text",
        buttonClass: "btn btn-warning",
        linkClass: "card-link"
    };

    defaultData = {
        title: "Sample Card Title",
        subTitle: "Sample Card Sub Title",
        description: "This is a sample description for the card component.",
        image: "1.jpeg",
        buttons: [
            { text: "Click here!", link: "https://www.google.com", class: "btn btn-primary" },
            { text: "Submit!", link: "https://www.google.com", class: "btn btn-primary" },
            { text: "View More",link:"https://www.google.com", class:""}

        ],
        link: "https://www.google.com, Google it",

        showImage: true,
        showTitle: true,
        showSubTitle: true,
        showDescription: true,
        showButtons: true,
        showLink: true
    };

    data = {};
    config = {};

    constructor() {
        super();
        this.data = { ...this.defaultData };
        this.config = { ...this.defaultConfig };
    }

    connectedCallback() {
        this.updateData();
        this.renderComponent();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        try {
            if (name === 'config' && typeof newValue === 'string') {
                this.config = Object.assign(this.config, JSON.parse(newValue));
            }
            if (name === 'data' && typeof newValue === 'string') {
                this.data = Object.assign(this.data, JSON.parse(newValue));
            }
        } catch (e) {
            console.error("Error parsing attributes:", e);
        }

        this.renderComponent();
    }

    updateData() {
        const updatedData = JSON.parse(this.getAttribute('data') || '{}');
        this.data = updateDate || this.defaultDta;
        console.log(this.data);
    }

    renderComponent() {
        this.innerHTML = '';
        this.className = this.config.cardContainerClass;

        const wrapperElmWidth = getComputedStyle(this).width !== 'auto' ? getComputedStyle(this).width.trim() : '300px';
        this.style.width = `${parseInt(wrapperElmWidth)}px`;
        this.style.display = 'inline-block';

        if (this.data.showImage && this.data.image) {
            const img = this.createElement('img', this.config.imageClass);
            img.src = this.data.image;
            this.appendChild(img);
        }


        const cardBody = this.createElement('div', this.config.cardBodyClass);

        if (this.data.showTitle) {
            const title = this.createElement('h5', this.config.titleClass, this.data.title);
            cardBody.appendChild(title);
        }

        if (this.data.showSubTitle && this.data.subTitle) {
            const subTitle = this.createElement('h6', this.config.subTitleClass, this.data.subTitle);
            cardBody.appendChild(subTitle);
        }

        if (this.data.showDescription) {
            const description = this.createElement('p', this.config.textClass, this.data.description);
            cardBody.appendChild(description);
        }



        if(  this.data.showButton && this.data.button){
            const button = this.createElement('button', this, this.config.buttonClass, this.data.button);
            cardBody.appendChild(button);

        if(linkContSeperated.lenght === 2){

        }
     }

     

      if(this.data.showLinks && this .data.link){
      console.log(this.data.link);
      const linkContent = this.data.link;
      const linkConstSeperated = linkContent.split(",");


      if (linkContSeperated.lenght === 2){
        const url = linkConstSeperated[0].trim();
        const linkText = linkConstSeperated[1].trim();


        const link = this .createElement('card-link' ,this.config.linkClass, linkText);
        link.href = url;
        link.target ='_blank';
        link.style.display= "'block";
        link.style.margin = '0.7rem 0';
        cardBody.appendChild(link);
      }else{
        console.error("Link data is not formatted correctly.");
      }

       this .appendChild(cardBody);
    }




        if (this.data.showButtons && Array.isArray(this.data.buttons)) {
            const buttonContainer = this.createElement('div', 'button-container mt-2');
            
            this.data.buttons.forEach(buttonData => {
                const button = this.createElement('a', buttonData.class, buttonData.text);
                button.href = buttonData.link;
                button.target = "_blank";
                button.style.marginRight = "5px";

                buttonContainer.appendChild(button);
            });

            cardBody.appendChild(buttonContainer);
        }

        this.appendChild(cardBody);
    }
    
    

    createElement(tag, className, content ,link) {
        const elm = document.createElement(tag);
        elm.className = className;
        if (content) {
            elm.innerHTML = content;
        }
        return elm;
    }
}


customElements.define('card-component', CardComponent);

if (!window.customElementsList) window.customElementsList = [];
window.customElementsList.push({ component: 'card-component', componentClass: CardComponent });
