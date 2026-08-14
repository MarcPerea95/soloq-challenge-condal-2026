const DDRAGON_VER = "14.3.1";
const RAW_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRn56mRGDa04SRzR-XDTgpGILmuFLq7cmXCHhRHHa0x-t0r7MUOmWDClIshT7eQoIse6aeLMZG57bwo/pub?gid=335046215&single=true&output=csv";
const SHEET_CSV_URL = `https://corsproxy.io/?${encodeURIComponent(RAW_SHEET_URL)}`;

const rankSVGs = {
  CHALLENGER: `<svg viewBox="0 0 100 100"><path fill="#f4c875" d="M50 5 L95 27 L95 73 L50 95 L5 73 L5 27 Z"/><path fill="#ffffff" d="M50 20 L80 38 L80 62 L50 80 L20 62 L20 38 Z"/></svg>`,
  GRANDMASTER: `<svg viewBox="0 0 100 100"><path fill="#e03b3b" d="M50 5 L95 27 L95 73 L50 95 L5 73 L5 27 Z"/></svg>`,
  MASTER: `<svg viewBox="0 0 100 100"><path fill="#9d4dbb" d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z"/></svg>`,
  DIAMOND: `<svg viewBox="0 0 100 100"><path fill="#576bce" d="M50 5 L90 50 L50 95 L10 50 Z"/></svg>`,
  EMERALD: `<svg viewBox="0 0 100 100"><path fill="#00a86b" d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z"/></svg>`,
  PLATINUM: `<svg viewBox="0 0 100 100"><path fill="#23ad8b" d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z"/></svg>`,
  GOLD: `<svg viewBox="0 0 100 100"><path fill="#cd8837" d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z"/></svg>`,
  SILVER: `<svg viewBox="0 0 100 100"><path fill="#80989d" d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z"/></svg>`,
  BRONZE: `<svg viewBox="0 0 100 100"><path fill="#a75e43" d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z"/></svg>`,
  IRON: `<svg viewBox="0 0 100 100"><path fill="#575459" d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z"/></svg>`,
  UNRANKED: `<svg viewBox="0 0 100 100"><path fill="#333333" d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z"/></svg>`,
};

function getChampImgUrl(champName) {
  if (!champName || champName === "-") return "";
  const cleanName = champName.trim().replace(/['\s.]/g, "");
  return `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VER}/img/champion/${cleanName}.png`;
}

// Temporizador
const TARGET_DATE = new Date("August 25, 2026 23:59:59").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = TARGET_DATE - now;

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (distance < 0) return;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if (daysEl) daysEl.innerText = String(days).padStart(2, "0");
  if (hoursEl) hoursEl.innerText = String(hours).padStart(2, "0");
  if (minutesEl) minutesEl.innerText = String(minutes).padStart(2, "0");
  if (secondsEl) secondsEl.innerText = String(seconds).padStart(2, "0");
}

function parseCSV(text) {
  let lines = text.split("\n").filter(l => l.trim() !== "");
  if (lines.length === 0) return [];
  
  let headers = lines[0].split(",").map(h => h.trim().replace(/^"|"$/g, ""));
  let result = [];

  for (let i = 1; i < lines.length; i++) {
    let currentline = [];
    let row = lines[i];
    let inQuotes = false;
    let entry = "";

    for (let c = 0; c < row.length; c++) {
      let char = row[c];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        currentline.push(entry.trim().replace(/^"|"$/g, ""));
        entry = "";
      } else {
        entry += char;
      }
    }
    currentline.push(entry.trim().replace(/^"|"$/g, ""));

    let obj = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j] !== undefined ? currentline[j] : "";
    }
    result.push(obj);
  }
  return result;
}

document.addEventListener("DOMContentLoaded", async () => {
  updateCountdown();
  setInterval(updateCountdown, 1000);

  try {
    const response = await fetch(SHEET_CSV_URL);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const csvText = await response.text();
    const rawRows = parseCSV(csvText);

    if (rawRows.length === 0) {
      console.error("El CSV está vacío.");
      return;
    }

    const playerMap = {};

    rawRows.forEach(row => {
      let playerName = row["Player"] ? row["Player"].trim() : "";
      if (!playerName) return; // Si no hay nombre, saltar fila

      if (!playerMap[playerName]) {
        playerMap[playerName] = {
          name: playerName,
          tag: "EUW",
          tierName: "SILVER",
          division: 2,
          lp: 0,
          wins: 0,
          losses: 0,
          totalKills: 0,
          totalDeaths: 0,
          totalAssists: 0,
          totalCS: 0,
          totalGold: 0,
          totalVision: 0,
          totalPentakills: 0,
          totalDragons: 0,
          totalNashors: 0,
          totalTowers: 0,
          totalInhibs: 0,
          champsCount: {},
          opgg: `https://euw.op.gg/summoners/euw/${playerName}`
        };
      }

      let p = playerMap[playerName];
      let res = (row["Result"] || "").toLowerCase().trim();
      if (res === "win" || res === "true" || res === "1" || res === "victoria") {
        p.wins++;
      } else {
        p.losses++;
      }

      p.totalKills += parseFloat(row["Asesinatos"] || 0);
      p.totalDeaths += parseFloat(row["Muertes"] || 0);
      p.totalAssists += parseFloat(row["Asistencias"] || 0);
      p.totalCS += parseFloat(row["Total CS"] || 0);
      p.totalGold += parseFloat(row["Gold earned"] || 0);
      p.totalVision += parseFloat(row["Punt. visión"] || 0);
      p.totalPentakills += parseInt(row["Pentakills"] || 0);
      p.totalDragons += parseInt(row["Dragones"] || 0);
      p.totalNashors += parseInt(row["Barones"] || 0);
      p.totalTowers += parseInt(row["Torres"] || 0);
      p.totalInhibs += parseInt(row["Inhibidores"] || 0);

      let champ = row["Champ name"] ? row["Champ name"].trim() : (row["Champ"] ? row["Champ"].trim() : "");
      if (champ && champ !== "-") {
        p.champsCount[champ] = (p.champsCount[champ] || 0) + 1;
      }
    });

    let processed = Object.values(playerMap).map(p => {
      let totalGames = p.wins + p.losses;
      let winrate = totalGames > 0 ? Math.round((p.wins / totalGames) * 100) : 0;
      let kda = p.totalDeaths > 0 ? ((p.totalKills + p.totalAssists) / p.totalDeaths).toFixed(2) : (p.totalKills + p.totalAssists);
      
      let sortedChamps = Object.entries(p.champsCount).sort((a, b) => b[1] - a[1]);
      let topChamps = sortedChamps.slice(0, 3).map(c => c[0]);
      let otpChamp = sortedChamps.length > 0 ? sortedChamps[0][0] : "-";

      return {
        ...p,
        totalGames,
        winrate,
        kda: parseFloat(kda),
        champs: topChamps.length > 0 ? topChamps : ["Ahri"],
        otpChamp,
        uniqueChampsCount: Object.keys(p.champsCount).length,
        avgCS: totalGames > 0 ? (p.totalCS / totalGames).toFixed(1) : 0,
        avgGold: totalGames > 0 ? Math.round(p.totalGold / totalGames) : 0
      };
    });

    processed.sort((a, b) => {
      if (b.wins !== a.wins) return b.wins - a.wins;
      return b.winrate - a.winrate;
    });

    let bestWR = [...processed].sort((a, b) => b.winrate - a.winrate)[0] || processed[0];
    let mostGames = [...processed].sort((a, b) => b.totalGames - a.totalGames)[0] || processed[0];

    if (processed.length > 0) {
      const leader = processed[0];
      document.getElementById("hl-leader").innerText = leader.name;
      document.getElementById("hl-leader-rank").innerText = `${leader.wins} Victorias (${leader.winrate}% WR)`;

      document.getElementById("hl-wr-player").innerText = bestWR.name;
      document.getElementById("hl-wr-val").innerText = `${bestWR.winrate}% (${bestWR.wins}V / ${bestWR.losses}D)`;

      document.getElementById("hl-games-player").innerText = mostGames.name;
      document.getElementById("hl-games-val").innerText = `${mostGames.totalGames} Partidas`;
    }

    let totalWinsAll = processed.reduce((acc, p) => acc + p.wins, 0);
    let totalLossesAll = processed.reduce((acc, p) => acc + p.losses, 0);
    let totalGamesAll = totalWinsAll + totalLossesAll;
    let globalWinrate = totalGamesAll > 0 ? Math.round((totalWinsAll / totalGamesAll) * 100) : 0;

    document.getElementById("gs-total-games").innerText = totalGamesAll;
    document.getElementById("gs-total-wins").innerText = `${totalWinsAll}V`;
    document.getElementById("gs-total-losses").innerText = `${totalLossesAll}D`;
    document.getElementById("gs-global-wr").innerText = `${globalWinrate}%`;
    document.getElementById("gs-wr-fill").style.width = `${globalWinrate}%`;

    let globalChampCounts = {};
    processed.forEach(p => {
      Object.entries(p.champsCount).forEach(([c, cnt]) => {
        globalChampCounts[c] = (globalChampCounts[c] || 0) + cnt;
      });
    });

    let mostChamp = "-", maxC = 0;
    Object.entries(globalChampCounts).forEach(([c, cnt]) => {
      if (cnt > maxC) { maxC = cnt; mostChamp = c; }
    });

    document.getElementById("gs-most-champ-img").innerHTML = `<img src="${getChampImgUrl(mostChamp)}" alt="${mostChamp}">`;
    document.getElementById("gs-most-champ-name").innerText = mostChamp;
    document.getElementById("gs-most-champ-count").innerText = `Elegido ${maxC} veces`;

    let worstWRPlayer = [...processed].sort((a, b) => a.winrate - b.winrate)[0];

    let bestChamp = bestWR && bestWR.champs[0] ? bestWR.champs[0] : "-";
    document.getElementById("gs-best-champ-img").innerHTML = `<img src="${getChampImgUrl(bestChamp)}" alt="${bestChamp}">`;
    document.getElementById("gs-best-champ-name").innerText = bestChamp;
    document.getElementById("gs-best-champ-wr").innerText = `${bestWR ? bestWR.winrate : 0}% WR (${bestWR ? bestWR.name : "-"})`;

    let worstChamp = worstWRPlayer && worstWRPlayer.champs[0] ? worstWRPlayer.champs[0] : "-";
    document.getElementById("gs-worst-champ-img").innerHTML = `<img src="${getChampImgUrl(worstChamp)}" alt="${worstChamp}">`;
    document.getElementById("gs-worst-champ-name").innerText = worstChamp;
    document.getElementById("gs-worst-champ-wr").innerText = `${worstWRPlayer ? worstWRPlayer.winrate : 0}% WR (${worstWRPlayer ? worstWRPlayer.name : "-"})`;

    const tbody = document.getElementById("leaderboard-body");
    let tableHtml = "";

    processed.forEach((p, index) => {
      const rankClass = index === 0 ? "rank-1" : index === 1 ? "rank-2" : index === 2 ? "rank-3" : "";
      const svgIcon = rankSVGs[p.tierName] || rankSVGs.UNRANKED;
      
      const champsHtml = p.champs.map(c => `
        <div class="champ-avatar" title="${c}">
            <img src="${getChampImgUrl(c)}" alt="${c}">
        </div>
      `).join("");

      tableHtml += `
        <tr>
            <td class="rank-num ${rankClass}">#${index + 1}</td>
            <td>
                <div class="player-cell">
                    <div class="player-details">
                        <div class="name">${p.name} <span style="font-size: 0.8rem; color: var(--text-muted)">#${p.tag}</span></div>
                    </div>
                </div>
            </td>
            <td>
                <div class="tier-cell">
                    <div class="tier-icon-container">${svgIcon}</div>
                    <div><div class="tier-name">${p.wins} Victorias</div></div>
                </div>
            </td>
            <td><strong>${p.lp} LP</strong></td>
            <td><span style="color:var(--win-color); font-weight:700;">${p.wins}V</span> - <span style="color:var(--loss-color); font-weight:700;">${p.losses}D</span></td>
            <td>
                <div class="winrate-bar-container">
                    <div class="winrate-text">
                        <span>${p.winrate}%</span>
                        <span style="font-size:0.75rem; color:var(--text-muted);">${p.totalGames}p</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${p.winrate}%"></div>
                    </div>
                </div>
            </td>
            <td><div class="champs-flex">${champsHtml}</div></td>
            <td><a href="${p.opgg}" target="_blank" style="color: var(--accent-cyan); text-decoration: none; font-weight:600; font-size:0.85rem;">OP.GG ↗</a></td>
        </tr>
      `;
    });
    tbody.innerHTML = tableHtml;

    // Salón de la Fama con los 16 logros completos y apuntando a tus columnas
    const bestKDA = [...processed].sort((a, b) => b.kda - a.kda)[0] || processed[0];
    const mostKills = [...processed].sort((a, b) => b.totalKills - a.totalKills)[0] || processed[0];
    const mostDeaths = [...processed].sort((a, b) => b.totalDeaths - a.totalDeaths)[0] || processed[0];
    const mostVision = [...processed].sort((a, b) => b.totalVision - a.totalVision)[0] || processed[0];
    const mostGold = [...processed].sort((a, b) => b.totalGold - a.totalGold)[0] || processed[0];
    const mostPentakills = [...processed].sort((a, b) => b.totalPentakills - a.totalPentakills)[0] || processed[0];
    const mostObjectives = [...processed].sort((a, b) => (b.totalDragons + b.totalNashors) - (a.totalDragons + a.totalNashors))[0] || processed[0];
    const mostStructures = [...processed].sort((a, b) => (b.totalTowers + b.totalInhibs) - (a.totalTowers + a.totalInhibs))[0] || processed[0];
    const bestFarm = [...processed].sort((a, b) => b.avgCS - a.avgCS)[0] || processed[0];
    const otpMaster = [...processed].sort((a, b) => (b.champsCount[b.otpChamp] || 0) - (a.champsCount[a.otpChamp] || 0))[0] || processed[0];
    const varietyMaster = [...processed].sort((a, b) => b.uniqueChampsCount - a.uniqueChampsCount)[0] || processed[0];
    
    const leastDeaths = [...processed].sort((a, b) => a.totalDeaths - b.totalDeaths)[0] || processed[0];
    const mostAssists = [...processed].sort((a, b) => b.totalAssists - a.totalAssists)[0] || processed[0];

    const awardsContainer = document.getElementById("awards-container");
    const awards = [
      { icon: "fa-crown", title: "Líder supremo", name: processed[0]?.name, tag: processed[0]?.tag, detail: `${processed[0]?.wins} victorias registradas` },
      { icon: "fa-fire", title: "Built different", name: bestWR?.name, tag: bestWR?.tag, detail: `Mayor winrate (${bestWR?.winrate}%)` },
      { icon: "fa-gamepad", title: "El grinder", name: mostGames?.name, tag: mostGames?.tag, detail: `${mostGames?.totalGames} partidas jugadas` },
      { icon: "fa-star", title: "KDA player", name: bestKDA?.name, tag: bestKDA?.tag, detail: `KDA promedio de ${bestKDA?.kda}` },
      { icon: "fa-skull", title: "El asesino", name: mostKills?.name, tag: mostKills?.tag, detail: `${mostKills?.totalKills} asesinatos totales` },
      { icon: "fa-skull-crossbones", title: "AFK / 0 Ayuda", name: mostDeaths?.name, tag: mostDeaths?.tag, detail: `${mostDeaths?.totalDeaths} muertes acumuladas` },
      { icon: "fa-eye", title: "El ojo de dios", name: mostVision?.name, tag: mostVision?.tag, detail: `${mostVision?.totalVision} pts de visión` },
      { icon: "fa-horse-head", title: "One Trick Pony", name: otpMaster?.name, tag: otpMaster?.tag, detail: `Especialista en ${otpMaster?.otpChamp}` },
      { icon: "fa-users", title: "Main League of Legends", name: varietyMaster?.name, tag: varietyMaster?.tag, detail: `${varietyMaster?.uniqueChampsCount} campeones distintos` },
      { icon: "fa-coins", title: "El Rey Midas", name: mostGold?.name, tag: mostGold?.tag, detail: `Media de ${mostGold?.avgGold} oro/partida` },
      { icon: "fa-dragon", title: "Matabestias", name: mostObjectives?.name, tag: mostObjectives?.tag, detail: `${mostObjectives?.totalDragons} dragones y nashors` },
      { icon: "fa-chess-rook", title: "Tirana de Torres", name: mostStructures?.name, tag: mostStructures?.tag, detail: `${mostStructures?.totalTowers} torres destruidas` },
      { icon: "fa-bolt", title: "Por el culo te la hinco", name: mostPentakills?.name, tag: mostPentakills?.tag, detail: `${mostPentakills?.totalPentakills} pentakills` },
      { icon: "fa-bullseye", title: "Lasthit perfection", name: bestFarm?.name, tag: bestFarm?.tag, detail: `Media de ${bestFarm?.avgCS} CS por partida` },
      { icon: "fa-shield-halved", title: "Inmortal", name: leastDeaths?.name, tag: leastDeaths?.tag, detail: `Menor cantidad de muertes (${leastDeaths?.totalDeaths})` },
      { icon: "fa-hands-helping", title: "El buen compañero", name: mostAssists?.name, tag: mostAssists?.tag, detail: `${mostAssists?.totalAssists} asistencias totales` }
    ];

    let awardsHtml = "";
    awards.forEach(award => {
      awardsHtml += `
        <div class="award-card">
            <div class="award-icon-wrapper"><i class="fa-solid ${award.icon}"></i></div>
            <div class="award-title">${award.title}</div>
            <div class="award-winner-name">${award.name || "-"}</div>
            <div class="award-winner-tag">#${award.tag || "EUW"}</div>
            <div class="award-stat-detail">${award.detail}</div>
        </div>
      `;
    });
    awardsContainer.innerHTML = awardsHtml;

  } catch (error) {
    console.error("Error al cargar y procesar el Google Sheets:", error);
  }
});