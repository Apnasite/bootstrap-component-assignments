class ContentSection extends HTMLElement {
    static observedAttributes = ["config", "data"];
    defaultConfig = {
        
        contentWrapperClasss:"p-5",
        contentContainerClass:"container bg-image",
        Layout:"imageLeft",
        rowClass:"row p-5 align-items-left",
        contentLeftClass:"col-lg-6 mx-auto",
        contentImageWrapClass:"", 
        imageClass:"img-fluid rounded-5",
        contentRightClass:"col-lg-6 mx-auto",
        contentWrapperClass:"text-left ",
        contentTitleClass:"display-4 fs-1 fw-bold lh-1 mb-3n text-center p-5 text-blue",
        contentSubtitleClass:"fs-2 fw-bold mb-3 ",
        contentDescriptionClass:"fs-5 mb-4 pe-5",
        contentButtonWrapClass:"btn-toolbar gap-2",
        contentButton1Class:"btn btn-blue ",
        contentButton2Class:" text-blue text-decoration-none p-2 fw-bold"
        
       
       
    };
    defaultData={
        heading:"...Your Heading...",
        subheading:"....Your SubHeading....",
        description:"Prajapati Advertising’s Digital Marketing Services are designed to elevate your online presence and drive business growth. From SEO to enhance search rankings to Social Media Marketing/Management, Video Creation And Editing that builds brand engagement, we cover all your digital needs. Our expert PPC Advertising ensures targeted reach with measurable results. We create impactful websites with WordPress Wesite Development and craft compelling strategies through Content Creation. Achieve your marketing goals with customized solutions tailored to your brand!",
        buttons:{
            button1:{
                text:"Learn more",
                type:"primary"
            },
            button2:{
                text:"",
                type:""
            }
        },
        imageData:{
            image:"img/Digital-Marketing-1.jpg",
            imageAltText:"Hero Image"        
        } ,
        noOfServices : "4",
        backgroundImage:""
        
    
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
                .btn-blue{
                background-color:#2F3192;
                color:white;
                }
        `;
        this.appendChild(style);
       
        
        const wrapperElm = this.createElement("div", this.config.contentWrapperClasss);

        const containerElm=this.createElement("div",this.config.contentContainerClass);
        const contentTitle = this.createElement("h1", this.config.contentTitleClass);
        contentTitle.textContent = this.data.heading;
        containerElm.appendChild(contentTitle);
        
            if(this.config.Layout=="imageRight")
                {
            const row = this.createElement("div", this.config.rowClass);
            const col1 = this.createElement("div", this.config.contentLeftClass);
            const content = this.createElement("div", this.config.contentWrapperClass);
            
            const contentsubtitle = this.createElement("h2", this.config.contentsubtitleClass);
            contentsubtitle.textContent = this.data.subheading;
            const contentDescription = this.createElement("p", this.config.contentDescriptionClass);
            contentDescription.textContent = this.data.description;
                
            const buttonwrap = this.createElement("div", this.config.contentButtonWrapClass);
            var contentButton = "";
            Object.values(this.data.buttons).forEach(item => {
                if(item.type === "primary"){
                    contentButton = this.createElement("button", this.config.contentButton1Class);
                } else {
                    contentButton = this.createElement("a", this.config.contentButton2Class);
                }
                contentButton.textContent = item.text;
                buttonwrap.appendChild(contentButton);
            });
        
            content.appendChild(contentsubtitle);
            content.appendChild(contentDescription); 
            content.appendChild(buttonwrap);
            col1.appendChild(content);
            row.appendChild(col1);
        
            const col2 = this.createElement("div", this.config.contentRightClass);
            const imgwrap = this.createElement("div", this.config.heroImageWrapClass);
            if (this.data.imageData.image) {  
                const img = this.createElement('img', this.config.imageClass);
                img.src = this.data.imageData.image;
                img.alt = this.data.imageData.imageAltText;  
                imgwrap.appendChild(img);
            }
            col2.appendChild(imgwrap);
            row.appendChild(col2);
            
            containerElm.appendChild(row);
        }else if(this.config.Layout=="imageLeft"){
            const row = this.createElement("div", this.config.rowClass);
            const col1 = this.createElement("div", this.config.contentLeftClass);

            const imgwrap = this.createElement("div", this.config.heroImageWrapClass);
            if (this.data.imageData.image) {  
                const img = this.createElement('img', this.config.imageClass);
                img.src = this.data.imageData.image;
                img.alt = this.data.imageData.imageAltText;  
                imgwrap.appendChild(img);
            }
            col1.appendChild(imgwrap);
            row.appendChild(col1);

            const col2 = this.createElement("div", this.config.contentRightClass);
            const content = this.createElement("div", this.config.contentWrapperClass);
            
            const contentsubtitle = this.createElement("h2", this.config.contentSubtitleClass);
            contentsubtitle.textContent = this.data.subheading;
            const contentDescription = this.createElement("p", this.config.contentDescriptionClass);
            contentDescription.textContent = this.data.description;
                
            const buttonwrap = this.createElement("div", this.config.contentButtonWrapClass);
            var contentButton = "";
            Object.values(this.data.buttons).forEach(item => {
                if(item.type === "primary"){
                    contentButton = this.createElement("button", this.config.contentButton1Class);
                } else {
                    contentButton = this.createElement("a", this.config.contentButton2Class);
                }
                contentButton.textContent = item.text;
                buttonwrap.appendChild(contentButton);
                row.appendChild(col2);
            });
        
            content.appendChild(contentsubtitle);
            content.appendChild(contentDescription); 
            content.appendChild(buttonwrap);
            col2.appendChild(content);
            
            row.appendChild(col2);
            containerElm.appendChild(row);
        }
        
         

        wrapperElm.appendChild(containerElm);
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

customElements.define("content-component", ContentSection);

if (!window.customElementsList) window.customElementsList = [];
window.customElementsList.push({ component: "content-component", componentClass: ContentSection});

