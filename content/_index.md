---
title: "Welcome to My Profile"
layout: "profile"
showPagination: false
showRecent: true
---

Hi! I'm Jeevan, a 16 year old student slogging through their A-Levels. This site was mainly created out of wanting to have a site. Now that I have it, I don't particularly know what to do with it. So its a blog? I suppose I'll try and keep things updated (not that anyone is reading this, but I operate on levels of delusion).  If you do happen to find this, you can find some write ups on some stuff that I probably read in an article and think was cool so I decided to dedicate an evening to learning. That is assuming that you're reading this a solid few months after I'm writing, the whole website is a tad bit barren right now...

<script src="https://unpkg.com/typeit@8.7.1/dist/index.umd.js"></script>
<script>
  const hasPlayed = sessionStorage.getItem("typeitPlayed");
  const target = document.querySelector("#typeit-target");

  if (hasPlayed) {
    target.innerText = "tecknet.gg"; 
  } else {
    new TypeIt("#typeit-target", {
      strings: ["Student", "Engineer", "Programmer","Guy", "Bob", "I'm running out of tags","Ok I'll stop","tecknet.gg"],
      speed: 70,
      deleteSpeed: 50,
      nextStringDelay: 1500,
      breakLines: false,
      loop: false,
      cursor: true,
      waitUntilVisible: true,
      afterComplete: function (instance) {
        sessionStorage.setItem("typeitPlayed", "true"); 
        setTimeout(() => {
          instance.destroy();
        }, 1000);
      },
    }).go();
  }
</script>
---
