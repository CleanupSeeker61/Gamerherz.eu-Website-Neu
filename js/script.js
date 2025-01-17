const config = {
    serverInfo: {
        serverLogoImageFileName: "logo.png",
        serverName: "Gamerherz.eu",
        serverIp: "Gamerherz.eu",
        discordServerID: "866268252245590016"
    },
    userSKinTypeInAdminTeam: "bust", /*[full, bust, head, face, front, frontFull, skin]*/
    atGroupsDefaultColors: {
        Owner: "rgba(255, 3, 3, 1)",
        Developers: "rgba(255, 104, 159, 1)",
        Partner: "rgba(255, 217, 0, 1)",
    },
    adminTeamPage: {
        owner: [
            {
                inGameName: "Nicouschulas",
                rank: "Owner",
                skinUrlOrPathToFile: "",
                rankColor: "rgba(255, 3, 3, 1)"
            },
            {
                inGameName: "Ventox09",
                rank: "CoOwner",
                skinUrlOrPathToFile: "",
                rankColor: "rgba(255, 75, 0, 1)"
            }
        ],
        developer: [
            {
                inGameName: "CleanupSeeker61",
                rank: "Developer",
                skinUrlOrPathToFile: "",
                rankColor: "rgba(255, 104, 159, 1)"
            }
        ],
        moderatoren: [
            {
                inGameName: "DARKSHADOWW",
                rank: "Discord Manager Moderator",
                skinUrlOrPathToFile: "",
                rankColor: "rgba(10, 87, 255, 1)"
            },
            {
                inGameName: "Fabax08",
                rank: "Discord Manager Moderator",
                skinUrlOrPathToFile: "",
                rankColor: "rgba(10, 87, 255, 1)"
            },
            {
                inGameName: "Cookie Wolf",
                rank: "Moderator",
                skinUrlOrPathToFile: "",
                rankColor: "rgba(10, 87, 255, 1)"
            }
        ],
        partner: [
            {
                inGameName: "Admin | Utopia Gaming",
                rank: "Partner",
                skinUrlOrPathToFile: "",
                rankColor: "rgba(255, 217, 0, 1)"
            },
            {
                inGameName: "Cookie | Atlatis Lounge",
                rank: "Partner",
                skinUrlOrPathToFile: "",
                rankColor: "rgba(255, 217, 0, 1)"
            },
            {
                inGameName: "Kinecthosting | Host yur Server",
                rank: "Partner",
                skinUrlOrPathToFile: "",
                rankColor: "rgba(255, 217, 0, 1)"
            }
        ]
    },

    contactPage: {
        email: "support@gamerherz.eu"
    }
}


/*Mobile navbar (open, close)*/
const navbar = document.querySelector(".navbar");
const navbarLinks = document.querySelector(".links");
const hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", () => {
    navbar.classList.toggle("active");
    navbarLinks.classList.toggle("active");
})

/*FAQs*/
const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");

accordionItemHeaders.forEach(accordionItemHeader => {
    accordionItemHeader.addEventListener("click", () => {
        accordionItemHeader.classList.toggle("active");
        const accordionItemBody = accordionItemHeader.nextElementSibling;

        if(accordionItemHeader.classList.contains("active")) accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
        else accordionItemBody.style.maxHeight = "0px";
    });
});

/*Config navbar*/
const serverName = document.querySelector(".server-name");
const serverLogo = document.querySelector(".logo-img");
/*Config header*/
const serverIp = document.querySelector(".minecraft-server-ip");
const serverLogoHeader = document.querySelector(".logo-img-header");
const discordOnlineUsers = document.querySelector(".discord-online-users");
const minecraftOnlinePlayers = document.querySelector(".minecraft-online-players");
/*Config contact*/
const contactForm = document.querySelector(".contact-form");
const inputWithLocationAfterSubmit = document.querySelector(".location-after-submit");

const getDiscordOnlineUsers = async () => {
    try {
        const discordServerId = config.serverInfo.discordServerID;

        const apiWidgetUrl = `https://discord.com/api/guilds/${discordServerId}/widget.json`;
        let response = await fetch(apiWidgetUrl);
        let data = await response.json();

        if(!data.presence_count) return "Fehler";
        else return (await data.presence_count);
    } catch (e) {
        return "Fehler";
    }
}

const getMinecraftOnlinePlayer = async () => {
    try {
        const serverIp = config.serverInfo.serverIp;

        const apiUrl = `https://api.mcsrvstat.us/2/${serverIp}`;
        let response = await fetch(apiUrl);
        let data = await response.json();

        return data.players.online;
    } catch (e) {
        console.log(e);
        return "0";
    }
}

const getUuidByUsername = async (username) => {
    try {
        const usernameToUuidApi = `https://api.minetools.eu/uuid/${username}`;
        let response = await fetch(usernameToUuidApi);
        let data = await response.json();

        return data.id;
    } catch (e) {
        console.log(e);
        return "None";
    }
}

const getSkinByUuid = async (username) => {
    try {
        const skinByUuidApi = `https://visage.surgeplay.com/${config.userSKinTypeInAdminTeam}/512/${await getUuidByUsername(username)}`;
        let response = await fetch(skinByUuidApi);

        if(response.status === 400) return `https://visage.surgeplay.com/${config.userSKinTypeInAdminTeam}/512/ec561538f3fd461daff5086b22154bce`;
        else return skinByUuidApi;
    } catch (e) {
        console.log(e);
        return "None";
    }
}

/*https website wird benötigt*/
const copyIp = () => {
    const copyIpButton = document.querySelector(".copy-ip");
    const copyIpAlert = document.querySelector(".ip-copied");

    copyIpButton.addEventListener("click", () => {
        try {
            navigator.clipboard.writeText(config.serverInfo.serverIp);
    
            copyIpAlert.classList.add("active");

            setTimeout(() => {
                copyIpAlert.classList.remove("active");
            }, 5000);
        } catch (e) {
            console.log(e);
            copyIpAlert.innerHTML = "An error has occurred!";
            copyIpAlert.classList.add("active");
            copyIpAlert.classList.add("error");

            setTimeout(() => {
                copyIpAlert.classList.remove("active");
                copyIpAlert.classList.remove("error");
            }, 5000);
        }
    })
}

const setDataFromConfigToHtml = async () => {
    /*Set config data to navbar*/
    serverName.innerHTML = config.serverInfo.serverName;
    serverLogo.src = `images/` + config.serverInfo.serverLogoImageFileName;

    /*Set config data to header*/
    serverIp.innerHTML = config.serverInfo.serverIp;

    let locationPathname = location.pathname;

    if(locationPathname == "/" || locationPathname.includes("index")) {
        copyIp();
        /*Set config data to header*/
        serverLogoHeader.src = `images/` + config.serverInfo.serverLogoImageFileName;
        discordOnlineUsers.innerHTML = await getDiscordOnlineUsers();
        minecraftOnlinePlayers.innerHTML = await getMinecraftOnlinePlayer();
    } else if(locationPathname.includes("rules")) {
        copyIp();
    }
    else if(locationPathname.includes("admin-team")) {
        for (let team in config.adminTeamPage) {
            const atContent = document.querySelector(".at-content");
            
            const group = document.createElement("div");
            group.classList.add("group");
            group.classList.add(team);

            const groupSchema = `
                <h2 class="rank-title">${team.charAt(0).toUpperCase() + team.slice(1)}</h2>
                <div class="users">
                </div>
            `;

            group.innerHTML = groupSchema;

            atContent.appendChild(group);

            for (let j = 0; j < config.adminTeamPage[team].length; j++) {
                let user = config.adminTeamPage[team][j];
                const group = document.querySelector("." + team + " .users");

                const userDiv = document.createElement("div");
                userDiv.classList.add("user");

                let userSkin = config.adminTeamPage[team][j].skinUrlOrPathToFile;

                if(userSkin == "") userSkin = await getSkinByUuid(user.inGameName);
                let rankColor = config.atGroupsDefaultColors[team];

                if(user.rankColor != "") {
                    rankColor = user.rankColor;
                }

                const userDivSchema = `
                    <img src="${await (userSkin)}" alt="${user.inGameName}">
                    <h5 class="name">${user.inGameName}</h5>
                    <p class="rank ${team}" style="background: ${rankColor}">${user.rank}</p>  
                `;

                userDiv.innerHTML = userDivSchema;
                group.appendChild(userDiv);
            }
        }
    } else if(locationPathname.includes("contact")) {
        contactForm.action = `https://formsubmit.co/${config.contactPage.email}`;
        discordOnlineUsers.innerHTML = await getDiscordOnlineUsers();
        inputWithLocationAfterSubmit.value = location.href;
    }
}

setDataFromConfigToHtml();