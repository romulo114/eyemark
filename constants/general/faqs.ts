import {
  features,
  getStarted,
  stakeholders,
  troubleshooting,
} from "@/public/assets/SVG/faqs";

const faqs = [
  {
    title: "What is Eyemark",
    content:
      "A web and mobile application domiciled in the Federal Ministry of Finance, Budget and National Planning (Budget and National Planning Arm) that enables and digitises the Monitoring and Evaluation process of the Federal Government of Nigeria's Capital Projects through citizen's engagement.",
    group: "general",
    category: "get-started",
  },
  {
    title: "What is Monitoring and Evaluation?",
    content:
      "Monitoring and Evaluation (M&E) is used to assess the performance of projects, institutions and programmes set up by governments, international organisations and NGOs. Its goal is to improve current and future management of outputs, outcomes and impact",
    group: "general",
    category: "get-started",
  },
  {
    title: "What are Capital Projects?",
    content:
      "A capital project is a long-term, capital-intensive investment project with a purpose to build upon, add to, or improve a Capital Asset. Capital Projects are defined by their large scale and large cost relative to other investments that involve less planning and resources. Examples include infrastructure projects such as <strong class='font-bold'>Railways</strong>, <strong class='font-bold'>Roads</strong>, <strong class='font-bold'>Dams</strong>, <strong class='font-bold'>Pipelines</strong>, <strong class='font-bold'>Refineries</strong>, <strong class='font-bold'>Power Plants</strong>, and <strong class='font-bold'>Buildings</strong>.",
    group: "general",
    category: "get-started",
  },
  {
    title: "What does Total Project Cost mean?",
    content:
      "The total project cost is the amount required to execute a project from start to finish.",
    group: "general",
    category: "get-started",
  },
  {
    title: "What does Total Appropriated mean?",
    content: `Total appropriated is the sum of all amounts/monies budgeted/set aside for a project per year.
      <br/>
      <br/>
      E.g. If <strong class='font-bold'>Project A</strong> is a new project and has a budget of <strong class='font-bold'>one hundred million naira</strong> (₦100,000,000) in 2021, then the Total Appropriated for Project A will be one hundred million naira throughout 2021. However, if in 2022, Project A is given a budget of <strong class='font-bold'>fifty million naira</strong> (₦50,000,000) then the Total Appropriated for Project A will be <strong class='font-bold'>one hundred and fifty million naira</strong> (₦150,000,000).`,
    group: "general",
    category: "get-started",
  },
  {
    title: "Why is the Total Project Cost more than the Total Appropriated?",
    content: `Sometimes the total cost of a project can be too large for the Federal Government to commit all the monetary resources required for it at once. In situations such as this, the Federal Government can decide to spread the cost over a couple years; meaning that the amount budgeted/appropriated for the project will be less than the total cost of the project.
        <br />
        <br />
        E.g. It will cost the Federal Government <strong class="font-bold">two hundred billion naira</strong> (₦200,000,000,000) to start and complete mega Project M. However, with other key projects to embark on and with the knowledge that the initial phase of Project M requires significantly less money than other stages, the Federal Government appropriates <strong class='font-bold'>forty billion naira</strong> (₦40,000,000,000) for Project M in 2022 (the first year of the project). Thus, making the <strong class="font-bold">Total Appropriated</strong> of Project M less than its <strong class="font-bold">Total Project Cost</strong>.`,
    group: "general",
    category: "get-started",
  },
  {
    title: "What does Amount Spent So Far mean?",
    content: `Amount spent so far, or more commonly referred to as Amount Released is the amount of money the supervising ministry has paid to the contractor to execute the project at that given moment.
        <br />
        <br />
        E.g. Assume we have a project called <strong class="font-bold">Project A</strong> with a budget of <strong class="font-bold">one hundred million naira</strong> (₦100,000,000), overseen by the <strong class="font-bold">Ministry of Education</strong> and executed by <strong class="font-bold">Contractor B</strong>. If the Ministry of Education pays Contractor B <strong class="font-bold">five million naira</strong> (₦5,000,000) as a first payment and later pays Contractor B <strong class="font-bold">fifteen million naira</strong> (₦15,000,000) as their second payment, the Amount Spent So Far/Amount Released is currently <strong class="font-bold">twenty million naira</strong> (₦20,000,000).`,
    group: "general",
    category: "get-started",
  },
  {
    title: "What does Amount Utilised mean?",
    content: `Amount spent so far, or more commonly referred to as Amount Released is the amount of money the <strong class="font-bold">Ministry of Finance, Budget and National Planning</strong> has given/paid to the supervising ministry for the project at the moment.
      <br />
      <br />
      E.g. Assume we have a project called <strong class="font-bold">Project A</strong> with a budget of <strong class="font-bold">one hundred million naira</strong> (₦100,000,000), supervised by the <strong class="font-bold">Ministry of Education</strong>. If the Ministry of Finance, Budget and National Planning gives the Ministry of Education <strong class="font-bold">twenty-five million naira</strong> (₦25,000,000) to kickstart the project and later releases another <strong class="font-bold">twenty-five million naira</strong> (₦25,000,000) to the Ministry of Education, the Amount Spent So Far/Amount Released is currently <strong class="font-bold">fifty million naira</strong> (₦50,000,000).`,
    group: "general",
    category: "get-started",
  },
  {
    title: "What are SDGs?",
    content: `SDG stands for "<strong class="font-bold">Sustainable Development Goal</strong>". It is used in reference to the UN's goals set for nations to achieve by 2030. There are 17 goals, each with multiple targets and indicators. Its plural form is SDGs. You can read more about them at: <a href="https://sdgs.un.org/goals" class="text-accepted">https://sdgs.un.org/goals</a>`,
    group: "general",
    category: "get-started",
  },
  {
    title: "What are sentiments?",
    content: `<strong class="font-bold">Sentiments</strong> on Eyemark represent the feeling you are trying to express through your <strong class="font-bold">review of a project</strong> or <strong class="font-bold">project update</strong>. They do not exactly represent how you feel about the project as a whole because it is possible to, for example, give a <strong class="font-bold">disappointed</strong> review that a project has not been updated in a long time but still feel <strong class="font-bold">hopeful</strong> about the project as a whole. It is very important to choose the right sentiment to the best of your ability.`,
    group: "general",
    category: "get-started",
  },
  {
    title: "What does “Avg. Sentiment” mean?",
    content: `Avg. Sentiment is short for <strong class="font-bold">Average Sentiment</strong>, and it represents the most occurring sentiment throughout a project’s history. Although named Average for mass understanding, in application, it is actually the <strong class="font-bold">Mode</strong> of all sentiments.`,
    group: "general",
    category: "get-started",
  },
  {
    title: "How Do I Discover Projects on Eyemark?",
    content: `You can discover projects on Eyemark in multiple ways. The first is through the <strong class="font-bold">Discover</strong> page which shows projects around you, projects nearing completion and gives you the option to search certain key phrases to find relevant projects. E.g. “rehabilitation” to discover all projects focused on restoring already existing infrastructure. 
      <br />
      <br />
      The other way to discover projects is through the <strong class="font-bold">Categories</strong> page; here you can discover projects by going to the relevant category, e.g. <strong class="font-bold">Sectors</strong>. After which you can further pick a sub-category to explore such as <strong class="font-bold">Education</strong>.`,
    group: "citizen",
    category: "get-started",
  },
  {
    title: "What does it mean to “Eyemark” a Project?",
    content: `To <strong class="font-bold">Eyemark</strong> a project is to follow/bookmark/favourite the project in order not to keep looking for it everytime you want to check it out.`,
    group: "citizen",
    category: "get-started",
  },
  {
    title: "How Do I View Projects In Different States?",
    content: `To view projects in different states, go to the discover page, <strong class="font-bold">allow</strong> location in the <strong class="font-bold">Projects Around Me</strong> section if you haven’t already. If we cannot find your location we’ll give you the option of choosing any state to see projects around you. However, we can find your location, you can still choose any state to see projects in by clicking on <strong class="font-bold">Live Location (10km)</strong> and clicking <strong class="font-bold">choose state</strong>. Simplifying click on your state of choice and then hit the <strong class="font-bold">submit</strong> button.`,
    group: "citizen",
    category: "features",
  },
  {
    title: "How Do I Reset My Password?",
    content: `To reset your password, make your way to the <strong class="font-bold">Login</strong> in page by clicking the <strong class="font-bold">Login</strong> button on the homepage or while in the Eyemark app. Once on the Login page, click <strong class="font-bold">Forgot Password?</strong> below the Log In button. Enter the email address linked to your Eyemark account and click <strong class="font-bold">Send Link</strong>. Check your email for the link and click it once found, you’ll be redirected to a page on Eyemark for resetting your password. Enter your new password and confirm it, then submit to confirm and rest your password`,
    group: "general",
    category: "features",
  },
  {
    title: "How do I find Projects Around Me?",
    content: `Go to the <strong class="font-bold">Discover</strong> page, once loaded the <strong class="font-bold">Projects Around Me</strong> section will come up. In the section, you’ll be prompted to enable Eyemark to access your location, click <strong class="font-bold">allow</strong> and your browser will let you know we are asking to know your location, click <strong class="font-bold">allow</strong> on the browser prompt and we’ll get your location and show you projects around you.`,
    group: "citizen",
    category: "features",
  },
  {
    title: "How do I post Reviews on Projects?",
    content: `To review a project, go to the project’s page and hover/click on the <span class="font-bold">green button with three (3) dots</span> at the bottom right of the page. Once clicked you will see the review button as one of the options; it is the button with a <span class="font-bold">Pen/Biro and a plus (+)</span> beside it.
      <br />
      <br />
      Once clicked, a pop up will appear asking you how you feel about the project. Select the appropriate sentiment, write your review, add images if you have any and write an appropriate title that sums up your review. Click the post button and you’ve successfully reviewed a project.
      `,
    group: "citizen",
    category: "features",
  },
  {
    title: "How do I post Reviews on Project Updates?",
    content: `To review project updates, navigate to the update you would like to review. If the update has not been reviewed by anyone, click <span class="font-bold">Be the first to review this</span> to start the review process. However, if the update has had at least one (1) review, click <span class="font-bold">Comment</span> at the bottom of the update card to start the review process.
      <br />
      <br />
      Once clicked, a pop up will appear asking you how you feel about the project update. Select the appropriate sentiment, write your review, add images if you have any and write an appropriate title that sums up your review. Click the post button and you’ve successfully reviewed a project update.      
      `,
    group: "citizen",
    category: "features",
  },
  {
    title: "How to Share a Project on Social Media?",
    content: `You can share projects on social media by going to the page of the project you want to share and then clicking the <span class="font-bold">Share</span> icon located at:
      <br />
      <br />
  
      <ul class="list-disc list-inside">
       <li>The right side of the project name in the top bar, i.e. above <span class="font-bold">Overview</span>, <span class="font-bold">Activity</span>, <span class="font-bold">Media</span> & <span class="font-bold">Reviews</span>.</li>
        <br />
      <li>The green button with three (3) dots at bottom right of the page. Hover/Click to see the share button as one of the options.</li>
      </ul>
      <br />
  
      Once clicked, you will get a pop up with options of the social media you want to share the project on. Select the <span class="font-bold">social media</span> and you will be redirected to their website/app, follow their posting process to share the project from Eyemark.
      `,
    group: "citizen",
    category: "features",
  },
  {
    title: "How Do I View Projects in Different Ministries?",
    content: `Projects can be viewed by the ministry in charge of them by going to the <span class="font-bold">Categories</span> page, selecting the Ministries section and clicking on the ministry of interest. Check them out at: <a href="https://eyemark.ng/categories/ministries" class="text-accepted break-all">https://eyemark.ng/categories/ministries</a> `,
    group: "citizen",
    category: "features",
  },
  {
    title: "How Do I Search for Projects on Eyemark?",
    content: `On the top of the Discover page, you will find a search bar with a prompt to <span class="font-bold">Search Eyemark</span>. Click on the search bar, type in the <span class="font-bold">project name</span>, the <span class="font-bold">project code</span> or <span class="font-bold">keywords</span> to help you discover other projects and press enter on your keyboard.`,
    group: "citizen",
    category: "features",
  },
  {
    title: "How Do I Filter Projects on Eyemark?",
    content: `As a Citizen, 
      <br />
      <br />
      <ul class="list-disc list-inside">
        <li>Click on Categories</li>
        <br />
        <li>Select between Sectors, SDG’s and Ministries</li>
        <br />
        <li>Select which sub-category you want in the above categories</li>
        <br />
        <li>Click on the filter icon on the the top right hand corner</li>
      </ul>
      `,
    group: "citizen",
    category: "features",
  },
  {
    title: "What does CSO mean? / Who are CSOs?",
    content: `CSO’s are any non-profit, voluntary citizens group which is organized on a local, national or international level Task-oriented and driven by people with a common interest, civil society organisations (CSOs) perform a variety of services and humanitarian functions, bring citizens’ concerns to Governments, monitor policies, and encourage political participation at the community level.`,
    group: "citizen",
    category: "stakeholders",
  },
  {
    title: "What does MDA mean? / Who are MDAs?",
    content: `When talking about governmental structures in Nigeria, MDAs stands for Ministries, Departments, and Agencies, which are all public organizations used by the government to implement their programs and initiatives.
      <br />
      <br />
      <ul class="list-disc list-inside">
        <li>A ministry is a part of the executive arm of the federal government; it is headed by a minister who is appointed by the President of the country.</li>
        <br />
        <li>A department is a part of the public service controlled by governing officials (A department can only exist under the control of a minister)</li>
        <br />
        <li>An agency is a government or state organization that is responsible for the oversight and administration of specific functions  (Note: Agency’s are not a part of any department</li>
      </ul>
      `,
    group: "citizen",
    category: "stakeholders",
  },
  {
    title: "Who are Citizens?",
    content: `A citizen in its real sense is a native, resident, occupant, inhabitant or local of a particular town, city or country. However, on Eyemark, we use citizens to refer to any user of our application that is not an organisation.`,
    group: "citizen",
    category: "stakeholders",
  },
];

const faqCategories = [
  {
    name: "Get Started",
    desciption: "For all your basic Eyemark needs",
    styles: "sm:mr-8 xl:mr-0",
    image: getStarted,
    state: "get-started",
  },
  {
    name: "Features",
    desciption: "Become an Eyemark master",
    styles: "lg:mr-8",
    image: features,
    state: "features",
  },
  {
    name: "Stakeholders",
    desciption: "Understand all roles on Eyemark",
    styles: "sm:mr-8 xl:mr-0",
    image: stakeholders,
    state: "stakeholders",
  },
  {
    name: "Troubleshooting",
    desciption: "The solutions to all your problems",
    styles: "",
    image: troubleshooting,
    state: "troubleshooting",
  },
];

export { faqs, faqCategories };
