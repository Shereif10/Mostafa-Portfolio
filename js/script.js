
var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};

AOS.init();



// --------------------

document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch('https://formspree.io/f/mrbzawad', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Thanks for your message, I will reply as soon as possible",
                    showConfirmButton: false,
                    timer: 4000
                });
                document.getElementById('contact-form').reset();
            } else {
                Swal.fire({
                    position: "top-center",
                    icon: "error",
                    title: "Failed to send message",
                    showConfirmButton: false,
                    timer: 4000
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                position: "top-center",
                icon: "error",
                title: "Failed to send message",
                showConfirmButton: false,
                timer: 4000
            });
        });
});


// ---------------------

window.addEventListener('scroll', checkNavbar)
window.addEventListener('load', checkNavbar)


function checkNavbar(){
    const navbar = document.getElementById('navbar-example');
    const about = document.getElementById('about');
    const aboutTop = about.offsetTop - 100;

    if (window.scrollY >= aboutTop) {
        navbar.classList.add('bg-dark', 'shadow-lg')
        navbar.classList.remove('bg-transparent')
    }
    else {
        navbar.classList.add('bg-transparent')
        navbar.classList.remove('bg-dark', 'shadow-lg')
    }
}