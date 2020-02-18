window.onload = () => {
    
    //global variables
    var open_flag = false;
    const skills = ['.skill_cat-1', '.skill_cat-2', '.skill_cat-3'];
    var currentSkillPageNo = 0;
    var currentHeaderName = "Adithya Sreemandiram Anil";
    const header_containter = document.querySelector('.main_header-container');
    const navbox = document.querySelector('.navigation-items_container');
    const headerName = document.querySelector('.header-Name');
    const navitems = document.querySelector('.navitem_box');
    const menu_btn = document.querySelector('.menu');
    const page_cont = document.querySelector('.pages_container');
    const item_wrapper = document.querySelector('.home_item-wrap');
    const homeCont = document.querySelector('.home_container');
    const aboutMeCont = document.querySelector('.about-me_container');
    const header_boxes = document.querySelectorAll('.header-box');
    const down_arrow1 = document.querySelector('.down_arrow_page-1');
    const down_arrow2 = document.querySelector('.down_arrow_page-2');
    const up_arrow2 = document.querySelector('.up_arrow_page-2');
    const up_arrow3 = document.querySelector('.up_arrow_page-3');
    const projectsCont = document.querySelector('.projects_container');
    const iconGithub = document.getElementById('github-icon');
    const iconHackerrank = document.getElementById('hackerrank-icon');
    const iconLinkedIn = document.getElementById('linkedIn-icon');
    const gmailIcon = document.getElementById('gmail-icon');
    const rightArrow = document.querySelector('.fa-caret-right');
    const leftArrow = document.querySelector('.fa-caret-left');
    const menuHome = document.querySelector('.navitem-1');
    const menuAboutMe = document.querySelector('.navitem-2');
    const menuProjects = document.querySelector('.navitem-3');
    const menuResume = document.querySelector('.navitem-4');
    const projectBG = document.querySelector('.project-wrapper');
    const projectCont = document.querySelector('.project-container');
    const closeProject = document.querySelector('#project-close-btn');
    const projectGrid = document.querySelector('.project-grid-inner_wrapper');

    //projects object

    var project = {
        1 : {
            title: 'Portfolio',
            shortDesc: 'Personal Showcase',
            screenshot: '../assets/portfolio.png',
            description: "A static webpage build to showcase my skills and projects,made using minimal libaries, maximum original code.",
            tech: "Vanilla JS,HTML5,CSS",
            git: "https://github.com/adithyaanil1999/Portfolio",
            link: "https://adithyaanil1999.github.io/Portfolio/"
        },
        2:{
            title: 'WhatToWatch.io',
            shortDesc: 'Random Movie Recommender',
            screenshot: '../assets/whattowatch.png',
            description: "A static webpage which uses the TMDB API to fetch random movies, and list their details (and uses OMDB to fetch trailer and ratings). Implemented using MVC JS architecture",
            tech: "jQuery,Webpack,Node.Js",
            git: "https://github.com/adithyaanil1999/WhatToWatch",
            link: "https://adithyaanil1999.github.io/WhattoWatch.io/"
        },
        3:{
            title: 'Carby',
            shortDesc: 'Nutrition tracker',
            screenshot: '../assets/carby.png',
            description: "A web app that uses the Edamam API to tracker the calorific intake of the user. A full stack application that uses RESTful architecture to connect to mySQL DB using Express.JS web API's",
            tech: "React.Js,Redux,Express.JS,mySQL",
            git: "https://github.com/adithyaanil1999/carby",
            link: "N/A"
        }
    };

    {
        init();
        addEventListeners();
        populateProjectGrid();

        
    }

    function populateProjectGrid(){
        console.log('grid');
        var html = '';
        for(a in project){
            html += 
                `<div class="project-item project-1">
                    <div class="project-desc">
                    <h1>${project[a].title}</h1>
                    <button class="btn-project-${a}">View More</button>
                    </div>
                    <img src="${project[a].screenshot}" alt="">

                </div>
                `;
            ;
        }
        projectGrid.innerHTML = html;
        addProjectBtns();

    }

    function addProjectBtns(){
        for(a in project){
            document.querySelector(`.btn-project-${a}`).addEventListener('click',openProject.bind(null,a));
        }
        closeProject.addEventListener('click',handleCloseProject.bind(null));
    }

    function detectmob() { 
        if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
        ){
           return true;
        }
        else {
           return false;
        }
    }
    function addEventListeners(){
        down_arrow1.addEventListener('click', handlePageTransition.bind(null, homeCont, aboutMeCont, "About Me"));
        up_arrow2.addEventListener('click', handlePageTransition.bind(null, aboutMeCont, homeCont, "Adithya Sreemandiram Anil"));
        down_arrow2.addEventListener('click', handlePageTransition.bind(null, aboutMeCont, projectsCont, "My projects"));
        up_arrow3.addEventListener('click', handlePageTransition.bind(null, projectsCont, aboutMeCont, "About Me"));
        iconGithub.addEventListener('click',openwebpage.bind(null,'https://github.com/adithyaanil1999'));
        iconHackerrank.addEventListener('click',openwebpage.bind(null,'https://www.hackerrank.com/adithyas_anil99'));
        iconLinkedIn.addEventListener('click',openwebpage.bind(null,'https://www.linkedin.com/in/adithya-anil-784164191/'));
        gmailIcon.addEventListener('click',()=>{
            const el = document.createElement('textarea');
            el.value = "adithyas.anil99@gmail.com";
            document.body.appendChild(el);  
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            alert("Email address has been copied to clipboard");
        });
        rightArrow.addEventListener('click',handleSkillPageTransitionRight.bind(null));
        leftArrow.addEventListener('click',handleSkillPageTransitionLeft.bind(null));
        menuHome.addEventListener('click',handleMenuTransition.bind(null,homeCont,"Adithya Sreemandiram Anil"));
        menuAboutMe.addEventListener('click',handleMenuTransition.bind(null,aboutMeCont,"About Me"));
        menuProjects.addEventListener('click',handleMenuTransition.bind(null,projectsCont,"My projects"));
        menuResume.addEventListener('click',downloadResume.bind(null));
        projectBG.addEventListener('click',handleCloseProject.bind(null));
    }

    function handleCloseProject(){
        var isMob = detectmob();
        if(isMob === false){
            animateCSS(projectBG,'fadeOut',()=>{
                projectBG.style.display = 'none';
            });
            animateCSS(projectCont,'fadeOut faster',()=>{
                projectCont.style.display = 'none';
            });
        }
        else{
            animateCSS(projectCont,'slideOutDown',()=>{
                projectCont.style.display = 'none';
                animateCSS(projectBG,'fadeOut faster',()=>{
                    projectBG.style.display = 'none';
                });
            });
        }
        
    }

    function openProject(projectNo){
        var isMob = detectmob();
        if(isMob === false){
            projectBG.style.opacity = '0';
            if(projectBG.style.opacity == '0')
                projectBG.style.display = 'block';
            animateCSS(projectBG,'fadeIn faster',()=>{
                projectBG.style.opacity = '1';
                projectCont.style.display = 'grid';
                animateCSS(projectCont,'fadeIn faster');
            });
        }
        else{
            console.log('this');
            projectBG.style.opacity = '0';
            if(projectBG.style.opacity == '0')
                projectBG.style.display = 'block';
            animateCSS(projectBG,'fadeIn faster',()=>{
                projectBG.style.opacity = '1';
                projectCont.style.display = 'grid';
                animateCSS(projectCont,'slideInUp');
            });
        }
        
        const scCont = document.querySelector('.project-sc_cont');
        const descCont = document.querySelector('.project-desc_cont');
        const techCont = document.querySelector('.project-tech_cont');
        const gitCont = document.querySelector('.project-git_cont');
        const websiteCont = document.querySelector('.project-website_cont');
        const titleCont = document.querySelector('.project-title_cont');
        
        scCont.innerHTML = `<img src="${project[projectNo].screenshot}" class="projects_screenshot">`;
        titleCont.innerHTML = `<h1>${project[projectNo].title}</h1><h2>${project[projectNo].shortDesc}</h2>`;
        descCont.innerHTML = `<h1>Description:</h1><p>${project[projectNo].description}</p>`;

        var techArr = project[projectNo].tech.split(',');
        var techHTML = '';
        for (i in techArr){
            techHTML += `<p>• ${techArr[i]}</p>`
        }

        techCont.innerHTML = `<h1>Technology Used:</h1>${techHTML}`;
        gitCont.innerHTML = `<div class="project-git-link"><a href="${project[projectNo].git}" target="_blank">Code</a></div>`;
        if(project[projectNo].link !== 'N/A')
            websiteCont.innerHTML = `<div class="project-website-link"><a href="${project[projectNo].link}" target="_blank">Webpage</a></div>`;
        else
            websiteCont.innerHTML = `<div class="project-website-link"><p>${project[projectNo].link}</p></div>`;
    }
    function downloadResume(){
        console.log('down');
        var link = document.createElement('a');
        link.href = './assets/resume.pdf';
        link.download = 'resume.pdf';
        link.dispatchEvent(new MouseEvent('click'));
        handleClick();
    }
    
    function handleMenuTransition(pageName,title){
        function ret_page(pagename){
            if(pagename === "Adithya Sreemandiram Anil")
                return homeCont;
            else if (pagename === "About Me")
                return aboutMeCont;
            else    
                return projectsCont;
        }
        var prevPage = ret_page(currentHeaderName);
        var nextPage = ret_page(title);

        prevPage.style.display = 'none';
        nextPage.style.display = 'grid';
        const navCont = nextPage.querySelector('.navdown-container');
        navCont.style.display = 'flex';
        currentHeaderName = title;
        handleClick();
    }


    function handleSkillPageTransitionRight(){
        currentSkillPageNo++;
        if(currentSkillPageNo == 1 ){
            leftArrow.style.display = 'grid';
            animateCSS(leftArrow,'fadeIn');
        }
        if(currentSkillPageNo == 2){
            animateCSS(rightArrow,'fadeOut',()=>{
                rightArrow.style.display = 'none';
            });
        }
        var prevElement = document.querySelector(skills[currentSkillPageNo-1]);
        var nextElement = document.querySelector(skills[currentSkillPageNo]);


        animateCSS(prevElement,'moveLeft faster',()=>{
            prevElement.style.display = 'none';
            nextElement.style.display = 'grid';
            animateCSS(nextElement,'moveRight faster');
        });
    }

    function handleSkillPageTransitionLeft(){
        currentSkillPageNo--;
        if(currentSkillPageNo == 0){
            animateCSS(leftArrow,'fadeOut',()=>{
                leftArrow.style.display = 'none';
            });
        }
        if(currentSkillPageNo == 1){
            rightArrow.style.display = 'grid';
            animateCSS(rightArrow,'fadeIn');
        }

        var prevElement = document.querySelector(skills[currentSkillPageNo+1]);
        var nextElement = document.querySelector(skills[currentSkillPageNo]);

        animateCSS(prevElement,'moveRight_2 faster',()=>{
            prevElement.style.display = 'none';
            nextElement.style.display = 'grid';
            animateCSS(nextElement,'moveLeft_2 faster');
        });
    }

    function openwebpage(url){
        var win = window.open(url, '_blank');
         win.focus();
    }
    function init() {
        let navCont = document.querySelector('.home_nav');
        navCont.style.display = 'none';
        item_wrapper.style.display = 'none';
        animateCSS(header_containter, 'slideInDown', () => {
            item_wrapper.style.display = 'grid';
            animateCSS(item_wrapper, 'fadeIn');
            navCont.style.display = 'flex';
            animateCSS(navCont, 'fadeIn');
            header_boxes.forEach(element => {
                element.style.display = 'flex';
                animateCSS(element, 'fadeIn slow');
            });
        })
        menu_btn.addEventListener('click', handleClick);
        animateCanvas('header-canvas');
    }
    function animateCSS(node, animationName, callback) {
        //Animate.css Animation handler method
        let animatedArr = animationName.split(" ");
        node.classList.add('animated', ...animatedArr)
        function handleAnimationEnd() {
            node.classList.remove('animated', ...animatedArr);
            node.removeEventListener('animationend', handleAnimationEnd);
            if (typeof callback === 'function') callback()
        }
        node.addEventListener('animationend', handleAnimationEnd);
    }

    function handleClick() {
        //event listnet handler
        open_flag = !open_flag;
        handleHamburgerAnimations(open_flag);
    }

    function transitionend_open(ev) {
        const menu = document.querySelector('.extended_header');
        if (ev.propertyName == 'height') {
            page_cont.style.display = 'none';
            menu_btn.addEventListener('click', handleClick);
            navbox.style.display = 'flex';
            navitems.style.display = 'grid';
            menu.removeEventListener('transitionend', transitionend_open);
            animateCSS(navbox, 'fadeIn');
        }
    }
    function handleHamburgerAnimations(menuFlag) {
        //Handles the menu animation
        header_containter.classList.add('extended_header');

        if (menuFlag === true) {
            menu_btn.classList.add('open');
            flipHeader('Menu');
            menu_btn.removeEventListener('click', handleClick);
            const menu = document.querySelector('.extended_header');
            menu.style.height = '100%';
            menu.addEventListener('transitionend', transitionend_open);

        }
        else {
            const menu = document.querySelector('.extended_header');
            menu_btn.classList.remove('open');
            flipHeader(currentHeaderName);
            menu_btn.removeEventListener('click', handleClick);
            navitems.classList.add('faster');
            animateCSS(navitems, 'fadeOut', () => {
                navitems.style.display = 'none';
                page_cont.style.display = 'grid';
                menu.style.height = '10%';
                menu.addEventListener('transitionend', (event) => {
                    if (event.propertyName == 'height') {
                        menu_btn.addEventListener('click', handleClick);
                        navbox.style.display = 'none';
                    }
                });

            });
        }
    }
    
    function handlePageTransition(currentPage, nextPage, nextPageHeader) {
        //handles page transition animation down
        const navCont = nextPage.querySelector('.navdown-container');
        const item = nextPage.querySelector('.item_wrap');
        currentHeaderName = nextPageHeader;
        flipHeader(nextPageHeader);
        item.style.display = 'none';
        navCont.style.display = 'none';
        nextPage.style.display = 'grid';
        if (nextPage.style.display === 'grid') {
            animateCSS(currentPage, 'zoomOutFull slow', () => {
                currentPage.style.display = 'none';
                animateCSS(item, 'fadeIn slow');
                navCont.style.display = 'flex';
                animateCSS(navCont, 'fadeIn slow');
                item.style.display = 'grid';
                animateCSS(item, 'fadeIn slow');
            });
        }
    }

    function flipHeader(nextName){
        animateCSS(headerName,'flipUp faster',()=>{
            headerName.innerHTML = nextName;
            animateCSS(headerName,'flipDown faster');
        });
    }

    function animateCanvas(canvasName) {
        // console.log(canvasName)
        var canvas = document.getElementById(canvasName),
            can_w = parseInt(canvas.getAttribute('width')),
            can_h = parseInt(canvas.getAttribute('height')),
            ctx = canvas.getContext('2d');

        
        // console.log(typeof can_w);

        var ball = {
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            r: 0,
            alpha: 1,
            phase: 0
        },
            ball_color = {
                r: 207,
                g: 255,
                b: 4
            },
            R = 2,
            balls = [],
            alpha_f = 0.03,
            alpha_phase = 0,

            // Line
            link_line_width = 0.8,
            dis_limit = 260,
            add_mouse_point = true,
            mouse_in = false,
            mouse_ball = {
                x: 0,
                y: 0,
                vx: 0,
                vy: 0,
                r: 0,
                type: 'mouse'
            };

        // Random speed
        function getRandomSpeed(pos) {
            var min = -1,
                max = 1;
            switch (pos) {
                case 'top':
                    return [randomNumFrom(min, max), randomNumFrom(0.1, max)];
                    break;
                case 'right':
                    return [randomNumFrom(min, -0.1), randomNumFrom(min, max)];
                    break;
                case 'bottom':
                    return [randomNumFrom(min, max), randomNumFrom(min, -0.1)];
                    break;
                case 'left':
                    return [randomNumFrom(0.1, max), randomNumFrom(min, max)];
                    break;
                default:
                    return;
                    break;
            }
        }
        function randomArrayItem(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }
        function randomNumFrom(min, max) {
            return Math.random() * (max - min) + min;
        }
        // console.log(randomNumFrom(0, 10));
        // Random Ball
        function getRandomBall() {
            var pos = randomArrayItem(['top', 'right', 'bottom', 'left']);
            switch (pos) {
                case 'top':
                    return {
                        x: randomSidePos(can_w),
                        y: -R,
                        vx: getRandomSpeed('top')[0],
                        vy: getRandomSpeed('top')[1],
                        r: R,
                        alpha: 1,
                        phase: randomNumFrom(0, 10)
                    }
                    break;
                case 'right':
                    return {
                        x: can_w + R,
                        y: randomSidePos(can_h),
                        vx: getRandomSpeed('right')[0],
                        vy: getRandomSpeed('right')[1],
                        r: R,
                        alpha: 1,
                        phase: randomNumFrom(0, 10)
                    }
                    break;
                case 'bottom':
                    return {
                        x: randomSidePos(can_w),
                        y: can_h + R,
                        vx: getRandomSpeed('bottom')[0],
                        vy: getRandomSpeed('bottom')[1],
                        r: R,
                        alpha: 1,
                        phase: randomNumFrom(0, 10)
                    }
                    break;
                case 'left':
                    return {
                        x: -R,
                        y: randomSidePos(can_h),
                        vx: getRandomSpeed('left')[0],
                        vy: getRandomSpeed('left')[1],
                        r: R,
                        alpha: 1,
                        phase: randomNumFrom(0, 10)
                    }
                    break;
            }
        }
        function randomSidePos(length) {
            return Math.ceil(Math.random() * length);
        }

        // Draw Ball
        function renderBalls() {
            Array.prototype.forEach.call(balls, function (b) {
                if (!b.hasOwnProperty('type')) {
                    ctx.fillStyle = 'rgba(' + ball_color.r + ',' + ball_color.g + ',' + ball_color.b + ',' + b.alpha + ')';
                    ctx.beginPath();
                    ctx.arc(b.x, b.y, R, 0, Math.PI * 2, true);
                    ctx.closePath();
                    ctx.fill();
                }
            });
        }

        // Update balls
        function updateBalls() {
            var new_balls = [];
            Array.prototype.forEach.call(balls, function (b) {
                b.x += b.vx;
                b.y += b.vy;

                if (b.x > -(50) && b.x < (can_w + 50) && b.y > -(50) && b.y < (can_h + 50)) {
                    new_balls.push(b);
                }

                // alpha change
                b.phase += alpha_f;
                b.alpha = Math.abs(Math.cos(b.phase));
                // console.log(b.alpha);
            });

            balls = new_balls.slice(0);
        }

        // loop alpha
        function loopAlphaInf() {

        }

        // Draw lines
        function renderLines() {
            var fraction, alpha;
            for (var i = 0; i < balls.length; i++) {
                for (var j = i + 1; j < balls.length; j++) {

                    fraction = getDisOf(balls[i], balls[j]) / dis_limit;

                    if (fraction < 1) {
                        alpha = (1 - fraction).toString();

                        ctx.strokeStyle = 'rgba(150,150,150,' + alpha + ')';
                        ctx.lineWidth = link_line_width;

                        ctx.beginPath();
                        ctx.moveTo(balls[i].x, balls[i].y);
                        ctx.lineTo(balls[j].x, balls[j].y);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }
        }

        // calculate distance between two points
        function getDisOf(b1, b2) {
            var delta_x = Math.abs(b1.x - b2.x),
                delta_y = Math.abs(b1.y - b2.y);

            return Math.sqrt(delta_x * delta_x + delta_y * delta_y);
        }

        // add balls if there a little balls
        function addBallIfy() {
            if (balls.length < 20) {
                balls.push(getRandomBall());
            }
        }

        // Render
        function render() {
            ctx.clearRect(0, 0, can_w, can_h);

            renderBalls();

            renderLines();

            updateBalls();

            addBallIfy();

            window.requestAnimationFrame(render);
        }

        // Init Balls
        function initBalls(num) {
            for (var i = 1; i <= num; i++) {
                balls.push({
                    x: randomSidePos(can_w),
                    y: randomSidePos(can_h),
                    vx: getRandomSpeed('top')[0],
                    vy: getRandomSpeed('top')[1],
                    r: R,
                    alpha: 1,
                    phase: randomNumFrom(0, 10)
                });
            }
        }
        // Init Canvas
        function initCanvas() {
            canvas.setAttribute('width', window.innerWidth);
            canvas.setAttribute('height', window.innerHeight);

            can_w = parseInt(canvas.getAttribute('width'));
            can_h = parseInt(canvas.getAttribute('height'));
        }
        window.addEventListener('resize', function (e) {
            // console.log('Window Resize...');
            initCanvas();
        });

        function goMovie() {
            initCanvas();
            initBalls(30);
            window.requestAnimationFrame(render);
        }
        goMovie();

        // Mouse effect
        canvas.addEventListener('mouseenter', function () {
            // console.log('mouseenter');
            mouse_in = true;
            balls.push(mouse_ball);
        });
        canvas.addEventListener('mouseleave', function () {
            // console.log('mouseleave');
            mouse_in = false;
            var new_balls = [];
            Array.prototype.forEach.call(balls, function (b) {
                if (!b.hasOwnProperty('type')) {
                    new_balls.push(b);
                }
            });
            balls = new_balls.slice(0);
        });
        canvas.addEventListener('mousemove', function (e) {
            var e = e || window.event;
            mouse_ball.x = e.pageX;
            mouse_ball.y = e.pageY;
            // console.log(mouse_ball);
        });


    }

}