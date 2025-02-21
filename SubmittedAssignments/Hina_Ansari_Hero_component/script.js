class HeroSection extends HTMLElement {
    static observedAttributes = ["config", "data"];
    defaultConfig = {
        
        heroWrapperClasss:"p-5",
        heroContainerClass:"container p-5   bg-image",
        rowClass:"row align-items-left",
        heroLeftClass:"col-6 mx-auto",
        heroImageWrapClass:"", 
        imageClass:"img-fluid rounded-5",
        heroRightClass:"col-6 mx-auto",
        heroContentWrapperClass:"text-left ",
        heroTitleClass:"display-4 fs-1 fw-bold lh-1 mb-3 text-blue",
        heroSubtitleClass:"fs-2 fw-bold mb-3 ",
        heroDescriptionClass:"fs-5 mb-4",
        heroButtonWrapClass:"btn-toolbar gap-2",
        heroButton1Class:"btn btn-primary",
        heroButton2Class:" text-blue text-decoration-none p-2 fw-bold",
        footerClass: "container",
        footerRowClass: "row p-5",
        footerColClass: "col-lg-12 text-center",
        footerTextClass : " text-dark fw-bold fs-3"
       
       
    };
    defaultData={
        heading:"Sample Hero heading",
        subheading:"This is a sample subheading for the hero section.",
        description:"This is a sample description for the hero section.",
        buttons:{
            button1:{
                text:"Explore our Services",
                type:"primary"
            },
            button2:{
                text:"Contact us",
                type:"light"
            }
        },
        imageData:{
            image:"img/heroImage.webp",
            imageAltText:"Hero Image"        
        } ,
        backgroundImage:"",
        footertext:"100+ Conected Brands"
    
    };

    constructor() {
        super();
        this.data = { ...this.defaultData };
        this.config = { ...this.defaultConfig };
    }
    

    connectedCallback() {
        this.renderComponent();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        try {
            if (name === "config" && typeof newValue === "string") {
                this.config = Object.assign(this.config, JSON.parse(newValue));
            }
            if (name === "data" && typeof newValue === "string") {
                this.data = JSON.parse(newValue);
            }
        } catch (e) {
            console.log(e);
        }

        this.renderComponent();
    }

    renderComponent() {
        this.innerHTML = "";

        const style = document.createElement("style");
        style.textContent = `
            @import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css");
            @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css");

            .bg-image {
                background-image: url('${this.data.backgroundImage}');
                background-size: cover;
                background-position: center;
            }
                .text-blue{
                color:#2F3192;
                }
        `;
        this.appendChild(style);
       
        
        const wrapperElm = this.createElement("div", this.config.heroWrapperClasss);
        const containerElm=this.createElement("div",this.config.heroContainerClass);
        const row =this.createElement("div", this.config.rowClass);
        const col1 = this.createElement("div", this.config.heroLeftClass);
        const heroContent = this.createElement("div", this.config.heroContentWrapperClass);
        const heroTitle = this.createElement("h1", this.config.heroTitleClass);
        heroTitle.textContent = this.data.heading;
        const heroSubtitle = this.createElement("h2", this.config.heroSubtitleClass);
        heroSubtitle.textContent = this.data.subheading;
        const heroDescription = this.createElement("p", this.config.heroDescriptionClass);
        heroDescription.textContent = this.data.description;
            
        const buttonwrap =this.createElement("div", this.config.heroButtonWrapClass);
        var heroButton = "";
        Object.values(this.data.buttons).forEach(item => {
            if(item.type === "primary"){
                heroButton = this.createElement("button", this.config.heroButton1Class);
            } else {
                heroButton = this.createElement("a", this.config.heroButton2Class);
            }
            heroButton.textContent = item. text;
            buttonwrap.appendChild(heroButton);
          });
    
        
        heroContent.appendChild(heroTitle);
        heroContent.appendChild(heroSubtitle);
        
        heroContent.appendChild(heroDescription); 
        heroContent.appendChild(buttonwrap);
        
        col1.appendChild(heroContent);

        row.appendChild(col1);

        const col2 =this.createElement("div", this.config.heroRightClass);
          const imgwrap=this.createElement("div", this.config.heroImageWrapClass);
        if (this.data.imageData.image) {  
            const img = this.createElement('img', this.config.imageClass);
            img.src = this.data.imageData.image;
            img.alt = this.data.imageData.imageAltText;  
            imgwrap.appendChild(img);
        }
        col2.appendChild(imgwrap);
        
        row.appendChild(col2);
        containerElm.appendChild(row); 

        wrapperElm.appendChild(containerElm);

        const footer = this.createElement("div", this.config.footerClass);
        const footerRow = this.createElement("div",this.config.footerRowClass);
        const footerCol = this.createElement("div", this.config.footerColClass);
        const footerText = this.createElement("h2", this.config.footerTextClass);
        footerText.textContent = this.data.footertext;
        footerCol.appendChild(footerText);
        footerRow.appendChild(footerCol);
        footer.appendChild(footerRow);
        wrapperElm.appendChild(footer); 
        this.appendChild(wrapperElm);
    }

        createElement(tag, className, content) {
            const elm = document.createElement(tag);
            elm.className = className;
            if (content) {
                elm.textContent = content;
            }
            
            return elm;
        }

    
}

customElements.define("hero-component", HeroSection);

if (!window.customElementsList) window.customElementsList = [];
window.customElementsList.push({ component: "hero-component", componentClass: HeroSection});

