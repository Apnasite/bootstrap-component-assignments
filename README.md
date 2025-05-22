# 🧩 Bootstrap Website Theme with JavaScript Web Components

## 🧭 Goal

Build a **modular, reusable UI using JavaScript Web Components**. Each component should:

* Be created **using JavaScript DOM methods** (`document.createElement`, `appendChild`, `setAttribute`, etc.)
* Accept two attributes: `data` and `config`
* Reflect **live changes** when `data` or `config` is updated from `index.html`
* Use **Bootstrap** classes for responsive layout and design
* index.html should have complete website theme as per design provided

---

## 🔗 Live Deployment Format

`https://services.apnasite.in/bootstrap-component-assignments/[YourName_AssignmentNumber]/index.html`
**Example:**
[https://services.apnasite.in/bootstrap-component-assignments/Vilas_Shetkar_Card/index.html](https://services.apnasite.in/bootstrap-component-assignments/Vilas_Shetkar_Card/index.html)

---

## 📁 Folder Structure

```
bootstrap-component-assignments/
 ┣ 📂 SubmittedAssignments/
 ┃ ┗ 📂 [Your_Name_01]/
 ┃    ┣ 📜 index.html       // Component demo with dynamic data/config
 ┃    ┣ 📜 script.js        // All JS components created via DOM
 ┃    ┣ 📜 form.json        // JSON structure for data/config input
 ┃    ┣ 📂 img/             // Store images if needed
 ┃    ┣ 📂 css/             // Custom styles (if any)
 ┃    ┗ 📂 fonts/           // Fonts (optional)
```

---

## 🛠️ Component Requirements (In `script.js`)

Below are the required components, each with a brief description, expected data/config structure, and sample data/config.

---

### 1.1 🔝 HeaderBarSection

**Description:**  
A responsive header section including the company logo, company details, navigation bar, and action buttons. Designed for branding and primary navigation.

* Includes: **Logo**, **Company Details**, **Navbar**, **Buttons**
* Data: `companyDetails`, `navLinks`, `navItems`, `buttons`
* Config: Bootstrap classes for layout, navbar, logo, button styling

#### **Sample Data**
```json
{
    "companyDetails": {
        "companyName": "Apnasite IT Services Pvt. Ltd.",
        "logo": "https://erp.apnasite.in/api/download/erp.apnasite.in/default/Logo.png",
        "email": "info@apnasite.in",
        "mobile": "+91-1234567890"
    },
    "navLinks": [
        { "label": "Home", "url": "/" },
        { "label": "About", "url": "/about" },
        { "label": "Services", "url": "/services" },
        { "label": "Contact", "url": "/contact" }
    ],
    "navItems": [
        {
            "menuName": "User roles",
            "url": "/dashboard/user/assign-role"
        },
        {
            "menuName": "Masters",
            "url": "/dashboard/masters"
        },
        {
            "menuName": "CMS",
            "url": "/dashboard/cms"
        }
    ],
    "buttons": [
        {
            "label": "Login",
            "url": "/login",
            "className": "btn btn-primary ms-2"
        },
        {
            "label": "Sign Up",
            "url": "/signup",
            "className": "btn btn-outline-primary ms-2"
        }
    ]
}
```

#### **Sample Config**
```json
{
    "headerWrapperClass": "navbar navbar-expand-lg navbar-light bg-white shadow-sm",
    "containerClass": "container",
    "logoClass": "navbar-brand me-4",
    "companyNameClass": "fw-bold text-primary",
    "navClass": "navbar-nav me-auto mb-2 mb-lg-0",
    "navItemClass": "nav-item",
    "navLinkClass": "nav-link",
    "buttonWrapperClass": "d-flex align-items-center",
    "buttonClass": "btn"
}
```

---

### 1.2 🌟 HeroSection

**Description:**  
A visually engaging hero section with heading, subheading, description, main image, background, quick sign-on, search, and feature cards. Used for the main introduction and call-to-action.

* Includes: **Hero Heading**, **Subheading**, **Description**, **Image**, **Background Image**, **QuickSignOn**, **Search**, **Cards**
* Data: `heading`, `subHeading`, `description`, `image`, `imageAltText`, `backgroundImage`, `quickSignOn`, `search`, `cards`
* Config: Bootstrap classes for hero layout, image, cards, search, quickSignOn

#### **Sample Data**
```json
{
    "heading": "Welcome to <span class=\"text-primary\">Apnasite IT Services Pvt. Ltd.</span>",
    "subHeading": "Innovative solutions for a digital world.",
    "description": "Our services enable effective business process outsourcing, meet and exceed client expectations and function almost entirely in the interest of engineering the ideal customer experience.",
    "image": "https://erp.apnasite.in/api/download/erp.apnasite.in/default/HeroImage.jpg",
    "imageAltText": "Apnasite IT Services Pvt. Ltd.",
    "backgroundImage": "https://dev.erp.apnasite.in/api/download/6412b216d00e6d359a979cfe/default/apnasite-background.jpg",
    "search": {
        "redirectTo": "/search",
        "label": "Search",
        "placeholder": "Type text to search",
        "btnText": "Search"
    },
    "quickSignOn": {
        "data": {
            "source": "HomePage",
            "heading": "",
            "redirect": "/",
            "successHeading": "Welcome"
        },
        "config": {
            "mobileOnly": true,
            "showMessage": false,
            "mode": "light",
            "hideLabel": true
        }
    },
    "cards": [
        {
            "header": {
                "image": "",
                "heading": "Fast Delivery"
            },
            "heading": "Speedy Service",
            "subHeading": "Get your project delivered on time",
            "description": "We ensure timely delivery for all our clients.",
            "image": "",
            "image1": "",
            "url": "/services",
            "links": [
                {
                    "url": "/services",
                    "label": "Learn More",
                    "className": "link-primary"
                }
            ],
            "buttons": [
                {
                    "url": "/contact",
                    "className": "btn btn-primary",
                    "label": "Contact Us"
                }
            ],
            "icon": "rocket",
            "footer": {
                "image": "",
                "heading": "Trusted by 100+ clients"
            }
        }
    ],
    "dataType": "Static"
}
```

#### **Sample Config**
```json
{
    "heroWrapperClass": "py-5 position-relative bg-secondary",
    "heroContainerClass": "container",
    "heroContentWrapperClass": "row align-items-center",
    "heroLeftClass": "col-lg-7 col-sm-6",
    "heroRightClass": "col-lg-5 col-sm-6",
    "heroTextContentWrapperClass": "py-5",
    "contentImageWrapperClass": "hero-content-image-wrapper py-5",
    "contentImageClass": "img-fluid hero-content-image rounded",
    "showQuickSignon": true,
    "heroContactFormWrapperClass": "d-flex align-items-center",
    "heroContactFormClass": "d-block",
    "heroLinksContentWrapperClass": "d-flex justify-content-center",
    "heroCardsContentWrapperClass": "justify-content-center row row-cols-1 row-cols-md-2 g-3",
    "heroCardWrapperClass": "col",
    "cardConfig": {
        "cardClass": "border-0 text-left",
        "imageOverlay": false,
        "headerClass": "border-0 bg-transparent",
        "descriptionClass": "pb-1 text-muted"
    },
    "showBreadcrumb": false,
    "heroBreadCrumbWrapperClass": "row",
    "heroBreadCrumbContainerClass": "col-sm-6 pt-5 pb-4",
    "breadcrumbConfig": {
        "seperator": "/"
    },
    "showSearchBox": false,
    "searchWrapperClass": "container",
    "searchClass": "d-block",
    "searchConfig": {
        "btnClass": "btn primary",
        "btnTextHide": false,
        "labelHide": false
    },
    "mode": "light",
    "overlay": true,
    "layout": "LeftQuickSignOnRightImage"
}
```

---

### 2. 🎨 PortfolioSection

**Description:**  
A tab-based, filterable portfolio/gallery section to showcase projects, images, or team members. Supports both grid image and card layouts.

* Tab-based filterable content
* Data: `tabs[]`, `items[]` (each item maps to a tab)
* Config: Layout styling (grid, column, etc.)

#### **Sample Data**
```json
{
    "heading": "Portfolio",
    "subHeading": "Our Recent Work",
    "description": "Browse our projects by category.",
    "tabs": [
        { "label": "All", "value": "all" },
        { "label": "Material", "value": "material" },
        { "label": "Bootstrap", "value": "bootstrap" }
    ],
    "gridImages": {
        "heading": "Image Gallery",
        "images": [
            {
                "image": "https://images.pexels.com/photos/785059/pexels-photo-785059.jpeg",
                "category": "material"
            },
            {
                "image": "https://images.pexels.com/photos/2302802/pexels-photo-2302802.jpeg",
                "category": "material"
            },
            {
                "image": "https://images.pexels.com/photos/2302802/pexels-photo-2302802.jpeg",
                "category": "bootstrap"
            }
        ]
    },
    "cardSectionData": {
        "heading": "Team Portfolio",
        "cards": [
            {
                "heading": "Kaiara Spencer",
                "description": "PRODUCT MANAGER",
                "image": "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg",
                "category": "bootstrap"
            },
            {
                "heading": "Alex Johnson",
                "description": "UI DESIGNER",
                "image": "https://images.pexels.com/photos/1181695/pexels-photo-1181695.jpeg",
                "category": "bootstrap"
            },
            {
                "heading": "Maria Lee",
                "description": "DEVELOPER",
                "image": "https://images.pexels.com/photos/7468092/pexels-photo-7468092.jpeg",
                "category": "material"
            }
        ]
    }
}
```

#### **Sample Config**
```json
{
    "layout": "card", // "card" or "image"
    "gridImageConfig": {
        "sectionClass": "py-5 bg-light",
        "containerClass": "container",
        "headingClass": "h2 text-center mb-4",
        "gridWrapperClass": "row row-cols-1 row-cols-md-3 g-4",
        "imageWrapperClass": "col",
        "imageConfig": {
            "imageClass": "img-fluid rounded shadow"
        }
    },
    "cardSectionConfig": {
        "sectionClass": "py-5",
        "containerClass": "container",
        "headingClass": "h2 text-center mb-4",
        "cardsGridClass": "row row-cols-1 row-cols-md-3 g-4",
        "cardsConfig": {
            "cardClass": "card h-100",
            "imageClass": "card-img-top",
            "headingClass": "card-title mt-2",
            "descriptionClass": "card-text text-muted"
        }
    }
}
```

---

### 3. 💬 TestimonialSection

**Description:**  
A carousel section to display client testimonials and feedback, enhancing trust and credibility. Uses Bootstrap carousel for smooth transitions.

* Bootstrap Carousel showing client feedback
* Data: `testimonials[]` (name, image, feedback)
* Config: Carousel controls and item classes

#### **Sample Data**
```json
{
    "heading": "What our Clients have to say",
    "subHeading": "Trusted by businesses worldwide",
    "description": "Here are some testimonials from our satisfied clients.",
    "testimonials": [
        {
            "review": "Apnasite IT Services Pvt. Ltd. delivered exceptional software solutions that exceeded our expectations. Their team is highly professional and skilled.",
            "User": {
                "name": "Rahul Verma",
                "profilePicture": "",
                "designation": "CTO",
                "userCompany": "Tech Innovators",
                "userCompanyLogo": ""
            }
        },
        {
            "review": "The team at Apnasite is incredibly responsive and dedicated. They helped us streamline our operations with their custom software solutions.",
            "User": {
                "name": "Priya Sharma",
                "profilePicture": "",
                "designation": "Operations Manager",
                "userCompany": "Biz Solutions",
                "userCompanyLogo": ""
            }
        },
        {
            "review": "Working with Apnasite was a fantastic experience. Their expertise in software development is unmatched, and they delivered on time.",
            "User": {
                "name": "Amit Kapoor",
                "profilePicture": "",
                "designation": "CEO",
                "userCompany": "NextGen Tech",
                "userCompanyLogo": ""
            }
        }
    ],
    "dataType": "Static"
}
```

#### **Sample Config**
```json
{
    "sectionClass": "bg-light",
    "containerWrapperClass": "container py-5",
    "containerClass": "row",
    "descriptionWrapperClass": "col-12 mb-5",
    "leftWrapperClass": "col-5",
    "rightWrapperClass": "col-7",
    "headingClass": "fw-bold text-secondary",
    "subHeadingClass": "",
    "descriptionClass": "",
    "testimonialWrapperClass": "col-12",
    "testimonialCarouselClass": "testimonials mx-auto overflow-sm-hidden overflow-md-visible",
    "testimonialImageClass": "img-fluid",
    "cardContainerClass": "row row-cols-2 row-cols-md-4 g-3 justify-content-center",
    "cardWrapperClass": "col mb-3",
    "cardClass": "card h-100",
    "cardBodyClass": "card-body text-center",
    "horizontalCardBodyClass": "card-body d-flex flex-row justify-content-start align-items-center",
    "testimonialTextWrapperClass": "mx-auto",
    "testimonialReviewClass": "text-center mx-auto",
    "testimonialUserWrapperClass": "d-flex justify-content-center align-items-center",
    "testimonialUserPictureClass": "rounded-pill me-2",
    "testimonialUserPictureSize": "50px",
    "testimonialUserNameWrapperClass": "",
    "testimonialUserNameClass": "",
    "layout": "carousel",
    "carouselConfig": {
        "navPositionConfig": "d-none",
        "navigation": false,
        "pagination": {
            "clickable": true
        },
        "autoplay": {
            "delay": 10000
        }
    }
}
```

---

### 4. ❓ FAQSection

**Description:**  
An accordion-based FAQ section for displaying frequently asked questions and answers. Helps users quickly find information.

* Accordion for questions/answers
* Data: `items[]` (each with question, answer)
* Config: Accordion styling

#### **Sample Data**
```json
{
    "heading": "Frequently Asked Questions",
    "subHeading": "Apnasite IT Services Pvt. Ltd.",
    "description": "Find answers to the most commonly asked questions about our services.",
    "items": [
        {
            "name": "What services does Apnasite IT Services Pvt. Ltd. provide?",
            "title": "What services does Apnasite IT Services Pvt. Ltd. provide?",
            "description": "We provide a wide range of IT services including web development, mobile app development, cloud solutions, and IT consulting.",
            "group": "services"
        },
        {
            "name": "How can I contact Apnasite IT Services Pvt. Ltd.?",
            "title": "How can I contact Apnasite IT Services Pvt. Ltd.?",
            "description": "You can contact us via email at support@apnasite.com or call us at +91-1234567890.",
            "group": "contact"
        },
        {
            "name": "What is the process for starting a project with Apnasite?",
            "title": "What is the process for starting a project with Apnasite?",
            "description": "To start a project, you can reach out to us with your requirements. Our team will analyze your needs and provide a detailed proposal.",
            "group": "process"
        },
        {
            "name": "Does Apnasite offer support and maintenance services?",
            "title": "Does Apnasite offer support and maintenance services?",
            "description": "Yes, we offer comprehensive support and maintenance services to ensure your systems run smoothly.",
            "group": "services"
        },
        {
            "name": "What industries does Apnasite specialize in?",
            "title": "What industries does Apnasite specialize in?",
            "description": "We specialize in various industries including healthcare, education, e-commerce, and finance.",
            "group": "industries"
        },
        {
            "name": "Does Apnasite provide customized solutions?",
            "title": "Does Apnasite provide customized solutions?",
            "description": "Yes, we provide tailored solutions to meet the unique needs of our clients.",
            "group": "services"
        },
        {
            "name": "What is the typical project timeline?",
            "title": "What is the typical project timeline?",
            "description": "The project timeline depends on the complexity and scope of the project. We ensure timely delivery while maintaining quality.",
            "group": "process"
        },
        {
            "name": "How does Apnasite ensure data security?",
            "title": "How does Apnasite ensure data security?",
            "description": "We follow industry best practices and implement robust security measures to protect your data.",
            "group": "security"
        }
    ]
}
```

#### **Sample Config**
```json
{
    "closeOthers": true,
    "sectionClass": "py-5 bg-white",
    "containerClass": "container",
    "wrapperClass": "row justify-content-center",
    "contentWrapperClass": "col-lg-8",
    "headingClass": "h2 fw-bold text-center mb-4",
    "subHeadingClass": "h5 text-secondary text-center mb-3",
    "descriptionClass": "mb-4 text-center text-muted",
    "accordionWrapperClass": "accordion",
    "accordionLinkClass": "accordion-button"
}
```

---

### 5. 👣 FooterSection

**Description:**  
A comprehensive footer section including company info, navigation links, newsletter signup, contact details, and optional quick sign-on form. Supports multi-column layout.

* Includes: About, Quick Links, Newsletter Form, Contact Info, Contact Form
* Data: `aboutText`, `links[]`, `newsletter`, `contactDetails`, `formFields[]`
* Config: Column layout, form styling

#### **Sample Data**
```json
{
    "companyDetails": {
        "name": "Apnasite IT Services Private Limited",
        "logo": "https://apnasite.in/api/download/apnasite.in/Company/Logo.png",
        "address": {
            "line1": "Shevantai, Sr. No. 31/1, Matoshree Colony Lane 1",
            "line2": "Hari om Colony Lane 2, Shivanagari",
            "location": "Chinchwadgaon",
            "area": "Pune City",
            "city": "Pune",
            "state": "MAHARASHTRA",
            "country": "India",
            "pincode": "411033"
        },
        "contactDetails": {
            "email": "info@apnasite.in",
            "phone": "+91-1234567890",
            "socialLinks": [
                { "type": "facebook", "url": "https://facebook.com/apnasite" },
                { "type": "twitter", "url": "https://twitter.com/apnasite" },
                { "type": "linkedin", "url": "https://linkedin.com/company/apnasite" }
            ]
        }
    },
    "navItems": [
        {
            "menuName": "User roles",
            "url": "/dashboard/user/assign-role"
        },
        {
            "menuName": "Masters",
            "url": "/dashboard/masters"
        },
        {
            "menuName": "CMS",
            "url": "/dashboard/cms"
        }
    ],
    "newsletterFormFields": [
        {
            "key": "email",
            "type": "input",
            "templateOptions": {
                "type": "email",
                "label": "Email address",
                "placeholder": "Enter your email",
                "required": true
            }
        }
    ],
    "quickSignOn": {
        "data": {
            "heading": "Sign Up for Updates",
            "subHeading": "Stay informed with our newsletter",
            "description": "Get the latest news and updates from Apnasite.",
            "successHeading": "Thank you for subscribing!",
            "module": "newsletter",
            "leadCategory": "Newsletter",
            "leadType": "Subscription",
            "source": "Footer",
            "redirectUrl": "/thank-you"
        },
        "config": {
            "mode": "light",
            "mobileOnly": false,
            "showPassword": false,
            "hideLabel": false,
            "showMessage": true,
            "userDetailsRequired": false
        }
    }
}
```

#### **Sample Config**
```json
{
    "sectionClass": "footer-section bg-dark text-light pt-5 pb-3",
    "containerClass": "container",
    "rowClass": "row",
    "aboutColClass": "col-md-4 mb-4",
    "linksColClass": "col-md-2 mb-4",
    "newsletterColClass": "col-md-3 mb-4",
    "contactColClass": "col-md-3 mb-4",
    "logoClass": "mb-3",
    "companyNameClass": "h5 mb-2",
    "addressClass": "mb-2",
    "socialLinksClass": "d-flex gap-2 mb-3",
    "navListClass": "list-unstyled",
    "navItemClass": "mb-2",
    "newsletterFormClass": "newsletter-form d-flex",
    "newsletterInputClass": "form-control me-2",
    "newsletterBtnClass": "btn btn-primary",
    "contactInfoClass": "mb-2",
    "contactFormClass": "contact-form mt-3",
    "copyrightClass": "text-center mt-4",
    "showQuickSignOn": true
}
```

---

## 📜 `index.html` Instructions

* Import `script.js` and **use all components** with `data` and `config` as attributes
* Example Usage:

```html
<header-section 
  data='{"heading": "Welcome", "cards": [{"title": "HTML", "text": "Basics"}]}' 
  config='{"containerClass": "container", "cardClass": "card mb-3"}'>
</header-section>
```

* Changing `data` or `config` in `index.html` must **immediately reflect** updated output

---

## 🧾 `form.json` Structure

Use `form.json` to define a **Formly-compatible** input form that includes:

* Data fields (for component content)
* Config fields (for assigning Bootstrap classes)

---

## 🧪 Example DOM Structure (Card Component)

```javascript
const card = document.createElement("div");
card.className = config.cardClass || "card";

const title = document.createElement("h5");
title.className = config.titleClass || "card-title";
title.innerText = data.title;

card.appendChild(title);
this.appendChild(card);
```

---

## 🎨 Bootstrap Styling Tips

Use Bootstrap 5 classes like:

* `container`, `row`, `col`, `card`, `accordion`, `carousel`
* Responsive utilities: `mb-3`, `text-center`, `d-flex`, etc.
* Layout: Use Bootstrap grid system (`col-md-6`, `col-lg-4`)

---

## 🚀 Submission Process

### 1. 📦 Fork the Repository

👉 [https://github.com/Apnasite/bootstrap-component-assignments](https://github.com/Apnasite/bootstrap-component-assignments)

### 2. 💻 Clone Your Forked Repo

```bash
git clone https://github.com/YOUR_USERNAME/bootstrap-component-assignments.git
```

### 3. 🧩 Create Your Assignment Folder

```bash
mkdir SubmittedAssignments/Your_Name_01
```

### 4. 🛠️ Copy and Build

Copy sample folder structure and implement inside `script.js`, `index.html`, and `form.json`

### 5. ✅ Commit and Push

```bash
git add .
git commit -m "Added Web Components Assignment - Your_Name_01"
git push origin main
```

### 6. 🔃 Create Pull Request

Once you have committed and pushed your changes to your forked repository, follow these steps to create a Pull Request (PR):

1. **Go to your forked repository on GitHub.**
2. Click the **"Compare & pull request"** button that appears after your push, or go to the "Pull requests" tab and click **"New pull request"**.
3. Ensure the base repository is `Apnasite/bootstrap-component-assignments` and the base branch is `main`.
4. Compare it with your fork and branch containing your assignment.
5. Add a **clear title** and **description** for your PR (e.g., "Added Web Components Assignment - Your_Name_01").
6. Review your changes, then click **"Create pull request"**.

Your submission will be reviewed and feedback will be provided if needed.

## 🧪 Evaluation Criteria

| Evaluation Area                      | Weightage |
| ------------------------------------ | --------- |
| Use of DOM methods (`createElement`) | ✅✅✅       |
| Proper data/config parsing           | ✅✅        |
| Bootstrap integration                | ✅✅✅       |
| Live change reflection               | ✅✅✅       |
| Folder & file structure maintained   | ✅✅        |
| Component reusability                | ✅✅        |
| Git Workflow (Fork, PR, Commit)      | ✅✅        |
| Bonus: Formly JSON integration       | ⭐ Bonus   |

---

## 🔄 Reminder

This assignment focuses on **DOM-based JS component design**—avoid shortcuts like `innerHTML`. Use `appendChild`, `setAttribute`, `className`, etc., to ensure **dynamic, clean, and scalable component creation**.

> 💡 Tip: Think like a UI Library developer. Your component should be plug-and-play!
