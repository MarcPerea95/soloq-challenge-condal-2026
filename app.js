// Versión de Data Dragon y Mapeo de Emblemas de Ligas por SVG Exacto (Soporta todos los rangos)
const DDRAGON_VER = "14.3.1";

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
  const map = {
    Ahri: "Ahri",
    Sylas: "Sylas",
    Lux: "Lux",
    Ezreal: "Ezreal",
    Jinx: "Jinx",
    Kaisa: "Kaisa",
    Zed: "Zed",
    Yasuo: "Yasuo",
    Yone: "Yone",
    LeeSin: "LeeSin",
    Viego: "Viego",
    Graves: "Graves",
    Malphite: "Malphite",
    Garen: "Garen",
    Darius: "Darius",
    Rakan: "Rakan",
    Lulu: "Lulu",
    Nami: "Nami",
  };
  const key = map[champName] || champName;
  return `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VER}/img/champion/${key}.png`;
}

const tournamentData = {
  players: [
    {
      name: "Juanjo",
      tag: "BRO",
      tierName: "GOLD",
      division: 4,
      lp: 40,
      wins: 6,
      losses: 12,
      champs: ["Ahri", "Sylas", "Lux"],
      opgg: "https://euw.op.gg/summoners/euw/JuanchoCasalobas-BRO",
    },
    {
      name: "Marc",
      tag: "EUW",
      tierName: "SILVER",
      division: 2,
      lp: 85,
      wins: 10,
      losses: 11,
      champs: ["Ezreal", "Jinx", "Kaisa"],
      opgg: "https://euw.op.gg/summoners/euw/FableD0t-EUW",
    },
    {
      name: "Laion",
      tag: "SPAIN",
      tierName: "SILVER",
      division: 2,
      lp: 62,
      wins: 20,
      losses: 2,
      champs: ["Zed", "Yasuo", "Yone"],
      opgg: "https://euw.op.gg/summoners/euw/BarbAhridaddy-SPAIN",
    },
    {
      name: "Dügün",
      tag: "LGA",
      tierName: "SILVER",
      division: 3,
      lp: 65,
      wins: 12,
      losses: 9,
      champs: ["LeeSin", "Viego", "Graves"],
      opgg: "https://euw.op.gg/summoners/euw/Dugunsito-LGA",
    },
    {
      name: "Sito",
      tag: "GEY",
      tierName: "BRONZE",
      division: 2,
      lp: 57,
      wins: 10,
      losses: 3,
      champs: ["Malphite", "Garen", "Darius"],
      opgg: "https://euw.op.gg/summoners/euw/PerroSanchez-GEY",
    },
    {
      name: "Laia",
      tag: "koala",
      tierName: "BRONZE",
      division: 4,
      lp: 55,
      wins: 3,
      losses: 2,
      champs: ["Rakan", "Lulu", "Nami"],
      opgg: "https://euw.op.gg/summoners/euw/JustRakan-koala",
    },
  ],
};

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
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if (daysEl) daysEl.innerText = String(days).padStart(2, "0");
  if (hoursEl) hoursEl.innerText = String(hours).padStart(2, "0");
  if (minutesEl) minutesEl.innerText = String(minutes).padStart(2, "0");
  if (secondsEl) secondsEl.innerText = String(seconds).padStart(2, "0");
}

function romanDivision(divNum) {
  const roman = { 1: "I", 2: "II", 3: "III", 4: "IV" };
  return roman[divNum] || divNum;
}

document.addEventListener("DOMContentLoaded", () => {
  updateCountdown();
  setInterval(updateCountdown, 1000);

  const tierHierarchy = {
    IRON: 1,
    BRONZE: 2,
    SILVER: 3,
    GOLD: 4,
    PLATINUM: 5,
    EMERALD: 6,
    DIAMOND: 7,
    MASTER: 8,
    GRANDMASTER: 9,
    CHALLENGER: 10,
  };

  const processed = tournamentData.players.map((p) => {
    const total = p.wins + p.losses;
    const wr = total > 0 ? Math.round((p.wins / total) * 100) : 0;
    const lossRate = total > 0 ? Math.round((p.losses / total) * 100) : 0;
    return { ...p, totalGames: total, winrate: wr, lossRate: lossRate };
  });

  processed.sort((a, b) => {
    const tierDiff =
      (tierHierarchy[b.tierName] || 0) - (tierHierarchy[a.tierName] || 0);
    if (tierDiff !== 0) return tierDiff;

    // CORREGIDO: En LoL, la división 1 es mejor que la 4
    const divDiff = (a.division || 0) - (b.division || 0);
    if (divDiff !== 0) return divDiff;

    return b.lp - a.lp;
  });

  // 1. Destacados / Podio
  if (processed.length > 0) {
    const leader = processed[0];
    document.getElementById("hl-leader").innerText = leader.name;
    const leaderDiv = leader.division
      ? ` ${romanDivision(leader.division)}`
      : "";
    document.getElementById("hl-leader-rank").innerText =
      `${leader.tierName}${leaderDiv} (${leader.lp} LP)`;

    const bestWR = [...processed].sort((a, b) => b.winrate - a.winrate)[0];
    document.getElementById("hl-wr-player").innerText = bestWR.name;
    document.getElementById("hl-wr-val").innerText =
      `${bestWR.winrate}% (${bestWR.wins}V / ${bestWR.losses}D)`;

    const mostGames = [...processed].sort(
      (a, b) => b.totalGames - a.totalGames,
    )[0];
    document.getElementById("hl-games-player").innerText = mostGames.name;
    document.getElementById("hl-games-val").innerText =
      `${mostGames.totalGames} Partidas`;
  }

  // 2. Globales
  const totalWins = processed.reduce((acc, p) => acc + p.wins, 0);
  const totalLosses = processed.reduce((acc, p) => acc + p.losses, 0);
  const totalGames = totalWins + totalLosses;
  const globalWinrate =
    totalGames > 0 ? Math.round((totalWins / totalGames) * 100) : 0;

  document.getElementById("gs-total-games").innerText = totalGames;
  document.getElementById("gs-total-wins").innerText = `${totalWins}V`;
  document.getElementById("gs-total-losses").innerText = `${totalLosses}D`;
  document.getElementById("gs-global-wr").innerText = `${globalWinrate}%`;
  document.getElementById("gs-wr-fill").style.width = `${globalWinrate}%`;

  // Campeones globales
  const champCounts = {};
  processed.forEach((p) =>
    p.champs.forEach((c) => (champCounts[c] = (champCounts[c] || 0) + 1)),
  );
  let mostChamp = "-",
    maxC = 0;
  Object.entries(champCounts).forEach(([c, cnt]) => {
    if (cnt > maxC) {
      maxC = cnt;
      mostChamp = c;
    }
  });

  document.getElementById("gs-most-champ-img").innerHTML =
    `<img src="${getChampImgUrl(mostChamp)}" alt="${mostChamp}">`;
  document.getElementById("gs-most-champ-name").innerText = mostChamp;
  document.getElementById("gs-most-champ-count").innerText =
    `Elegido por ${maxC} jugador(es)`;

  const sortedByWR = [...processed].sort((a, b) => b.winrate - a.winrate);
  const bestWRPlayer = sortedByWR[0];
  const worstWRPlayer = sortedByWR[sortedByWR.length - 1];

  const bestChamp =
    bestWRPlayer && bestWRPlayer.champs[0] ? bestWRPlayer.champs[0] : "-";
  document.getElementById("gs-best-champ-img").innerHTML =
    `<img src="${getChampImgUrl(bestChamp)}" alt="${bestChamp}">`;
  document.getElementById("gs-best-champ-name").innerText = bestChamp;
  document.getElementById("gs-best-champ-wr").innerText =
    `${bestWRPlayer.winrate}% WR (${bestWRPlayer.name})`;

  const worstChamp =
    worstWRPlayer && worstWRPlayer.champs[0] ? worstWRPlayer.champs[0] : "-";
  document.getElementById("gs-worst-champ-img").innerHTML =
    `<img src="${getChampImgUrl(worstChamp)}" alt="${worstChamp}">`;
  document.getElementById("gs-worst-champ-name").innerText = worstChamp;
  document.getElementById("gs-worst-champ-wr").innerText =
    `${worstWRPlayer.winrate}% WR (${worstWRPlayer.name})`;

  // 3. Tabla de Clasificación
  const tbody = document.getElementById("leaderboard-body");
  let tableHtml = "";

  processed.forEach((p, index) => {
    const rankClass =
      index === 0
        ? "rank-1"
        : index === 1
          ? "rank-2"
          : index === 2
            ? "rank-3"
            : "";
    const svgIcon = rankSVGs[p.tierName] || rankSVGs.UNRANKED;
    const divName = p.division
      ? `${p.tierName} ${romanDivision(p.division)}`
      : `${p.tierName}`;

    const champsHtml = p.champs
      .map(
        (c) => `
            <div class="champ-avatar" title="${c}">
                <img src="${getChampImgUrl(c)}" alt="${c}">
            </div>
        `,
      )
      .join("");

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
                        <div><div class="tier-name">${divName}</div></div>
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
                <td>
                    <a href="${p.opgg}" target="_blank" style="color: var(--accent-cyan); text-decoration: none; font-weight:600; font-size:0.85rem;">OP.GG ↗</a>
                </td>
            </tr>
        `;
  });
  tbody.innerHTML = tableHtml;

  // 4. Salón de la Fama y Premios (Los 16 trofeos definitivos - Datos directos del Sheets)
  const awardsContainer = document.getElementById("awards-container");

  const awards = [
    {
      icon: "fa-crown",
      title: "Líder supremo",
      name: processed[0]?.name || "-",
      tag: processed[0]?.tag || "-",
      detail: `${processed[0]?.tierName || "Unranked"} (#1 Leaderboard)`,
    },
    {
      icon: "fa-fire",
      title: "Built different",
      name:
        processed.reduce(
          (prev, curr) => (curr.winrate > prev.winrate ? curr : prev),
          processed[0],
        )?.name || "-",
      tag:
        processed.reduce(
          (prev, curr) => (curr.winrate > prev.winrate ? curr : prev),
          processed[0],
        )?.tag || "-",
      detail: "Mayor porcentaje de victorias",
    },
    {
      icon: "fa-gamepad",
      title: "El grinder",
      name:
        processed.reduce(
          (prev, curr) => (curr.totalGames > prev.totalGames ? curr : prev),
          processed[0],
        )?.name || "-",
      tag:
        processed.reduce(
          (prev, curr) => (curr.totalGames > prev.totalGames ? curr : prev),
          processed[0],
        )?.tag || "-",
      detail: "Mayor número de partidas jugadas",
    },
    {
      icon: "fa-star",
      title: "KDA player",
      name: processed[0]?.name || "-", // Se conectará directamente a la columna de KDA del Sheets
      tag: processed[0]?.tag || "-",
      detail: "Mayor KDA registrado",
    },
    {
      icon: "fa-ghost",
      title: "Immortal Demon King",
      name: processed[0]?.name || "-", // Se conectará a la columna de % muertes/partida del Sheets
      tag: processed[0]?.tag || "-",
      detail: "Menor porcentaje de muertes/partida",
    },
    {
      icon: "fa-skull",
      title: "El asesino",
      name: processed[0]?.name || "-", // Se conectará a la columna de % kills/partida del Sheets
      tag: processed[0]?.tag || "-",
      detail: "Mayor porcentaje de kills por partida",
    },
    {
      icon: "fa-skull-crossbones",
      title: "AFK",
      name: processed[0]?.name || "-", // Se conectará a la columna de % muertes altas del Sheets
      tag: processed[0]?.tag || "-",
      detail: "Mayor porcentaje de muertes/partida",
    },
    {
      icon: "fa-eye",
      title: "El ojo de dios",
      name: processed[0]?.name || "-", // Se conectará a la columna de visión del Sheets
      tag: processed[0]?.tag || "-",
      detail: "Mayor puntuación de visión",
    },
    {
      icon: "fa-horse-head",
      title: "One Trick Pony",
      name: processed[0]?.name || "-", // Se conectará a la columna de OTP del Sheets
      tag: processed[0]?.tag || "-",
      detail: "Más partidas con un único personaje",
    },
    {
      icon: "fa-users",
      title: "Main League of Legends",
      name: processed[0]?.name || "-", // Se conectará a la columna de variedad de campeones del Sheets
      tag: processed[0]?.tag || "-",
      detail: "Más personajes distintos jugados",
    },
    {
      icon: "fa-coins",
      title: "El Rey Midas",
      name: processed[0]?.name || "-", // Se conectará a la columna de oro/minuto del Sheets
      tag: processed[0]?.tag || "-",
      detail: "Mayor porcentaje de oro por minuto",
    },
    {
      icon: "fa-dragon",
      title: "Matabestias",
      name: processed[0]?.name || "-", // Se conectará a la columna de dragones + nashor del Sheets
      tag: processed[0]?.tag || "-",
      detail: "Dragones y Nashor asesinados",
    },
    {
      icon: "fa-chess-rook",
      title: "911",
      name: processed[0]?.name || "-", // Se conectará a la columna de torres + inhibidores del Sheets
      tag: processed[0]?.tag || "-",
      detail: "Torres + inhibidores destruidos",
    },
    {
      icon: "fa-bolt",
      title: "Por el culo te la hinco",
      name: processed[0]?.name || "-", // Se conectará a la columna de pentakills del Sheets
      tag: processed[0]?.tag || "-",
      detail: "Mayor número de pentakills",
    },
    {
      icon: "fa-bullseye",
      title: "Lasthit perfection",
      name: processed[0]?.name || "-", // Se conectará a la columna de CS/minuto del Sheets
      tag: processed[0]?.tag || "-",
      detail: "Mejor porcentaje de farmeo por minuto",
    },
    {
      icon: "fa-globe",
      title: "Solo contra el mundo",
      name: processed[0]?.name || "-", // Se conectará a la columna de diferencia KDA vs WR del Sheets
      tag: processed[0]?.tag || "-",
      detail: "Mayor diferencia KDA vs % de victorias",
    },
  ];

  let awardsHtml = "";
  awards.forEach((award) => {
    awardsHtml += `
            <div class="award-card">
                <div class="award-icon-wrapper"><i class="fa-solid ${award.icon}"></i></div>
                <div class="award-title">${award.title}</div>
                <div class="award-winner-name">${award.name}</div>
                <div class="award-winner-tag">#${award.tag}</div>
                <div class="award-stat-detail">${award.detail}</div>
            </div>
        `;
  });
  awardsContainer.innerHTML = awardsHtml;
});
