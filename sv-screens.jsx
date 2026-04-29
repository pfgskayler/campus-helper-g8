// sv-screens.jsx — All views (v3 – Design System: Rammetto One + Montserrat + #FFF9EC/#5D2A42/#FB6376)

// ── HOME VIEW ──────────────────────────────────────────────
function HomeView({ events, navigate, onLike }) {
  const [activeCat, setActiveCat] = React.useState("Tous");
  const [query, setQuery] = React.useState("");
  const [focused, setFocused] = React.useState(false);

  // Combined filter: query + category
  const filtered = events.filter(e => {
    const matchCat = activeCat === "Tous" || e.cat === activeCat;
    const q = query.trim().toLowerCase();
    const matchQ = !q || [e.title, e.cat, e.loc].some(s => s.toLowerCase().includes(q));
    return matchCat && matchQ;
  });

  const hasFilter = query.trim() || activeCat !== "Tous";

  return (
    <div style={{ paddingBottom:64 }}>
      {/* ── HERO ── */}
      <div style={{
        background:`linear-gradient(135deg, ${T.purple} 0%, #8B3A5C 100%)`,
        borderRadius:24, padding:"48px 48px 44px", marginBottom:0,
      }}>
        {/* Greeting + title */}
        <p style={{ fontSize:14, color:"rgba(255,255,255,0.55)", fontFamily:F.body, fontWeight:600, marginBottom:10, textAlign:"center" }}>
          Bonjour Marie 👋
        </p>
        <h1 style={{ fontSize:38, fontFamily:F.title, fontWeight:400, color:"#fff", margin:"0 0 6px", lineHeight:1.2, textAlign:"center" }}>
          Événements à Bordeaux
        </h1>
        <p style={{ fontSize:15, color:"rgba(255,255,255,0.55)", fontFamily:F.body, fontWeight:500, marginBottom:28, textAlign:"center" }}>
          Révisions, coworking, sorties — retrouve ta communauté étudiante
        </p>

        {/* Search bar — large, Airbnb-style */}
        <div style={{ maxWidth:640, margin:"0 auto 0" }}>
          <div className="sv-search" style={{
            background:"#fff", borderRadius:16,
            display:"flex", alignItems:"center", gap:12,
            padding:"6px 6px 6px 20px",
            boxShadow: focused
              ? "0 0 0 3px rgba(251,99,118,0.35), 0 8px 32px rgba(0,0,0,0.18)"
              : "0 8px 32px rgba(0,0,0,0.18)",
          }}>
            <span style={{ fontSize:18, opacity:0.35, flexShrink:0 }}>🔍</span>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Rechercher un événement à Bordeaux..."
              style={{
                flex:1, border:"none", outline:"none", background:"none",
                fontSize:15, fontWeight:500, color:T.text,
                fontFamily:F.body, padding:"10px 0"
              }}
            />
            {query && (
              <button onClick={() => setQuery("")} style={{
                background:"none", border:"none", cursor:"pointer",
                color:T.sec, fontSize:18, padding:"0 8px", flexShrink:0
              }}>✕</button>
            )}
            <button onClick={() => navigate("create")} className="sv-btn-primary" style={{
              background:T.coral, color:"#fff", border:"none", borderRadius:12,
              padding:"11px 20px", fontFamily:F.body, fontWeight:700, fontSize:13,
              cursor:"pointer", whiteSpace:"nowrap", flexShrink:0,
              boxShadow:"0 3px 12px rgba(251,99,118,0.3)"
            }}>+ Créer</button>
          </div>
        </div>


      </div>

      {/* ── CATEGORY FILTERS ── */}
      <div style={{
        display:"flex", gap:8, flexWrap:"wrap", alignItems:"center",
        padding:"24px 0 32px",
        borderBottom:`1px solid ${T.border}`, marginBottom:40
      }}>
        {CATS.map(c => {
          const active = activeCat === c;
          return (
            <button key={c} onClick={() => setActiveCat(c)}
              className={`sv-pill${active ? " sv-pill-active" : ""}`}
              style={{
                padding:"8px 20px", borderRadius:50, fontWeight:600, fontSize:13,
                fontFamily:F.body, cursor:"pointer",
                background: active ? T.coral : T.card,
                color: active ? "#fff" : T.sec,
                border:`1.5px solid ${active ? T.coral : T.border}`,
                boxShadow: active ? "0 4px 14px rgba(251,99,118,0.3)" : "none",
              }}>{c}</button>
          );
        })}
        {hasFilter && (
          <button onClick={() => { setQuery(""); setActiveCat("Tous"); }} style={{
            padding:"8px 16px", borderRadius:50, fontWeight:600, fontSize:13,
            fontFamily:F.body, background:"none", cursor:"pointer",
            color:T.sec, border:`1.5px solid ${T.border}`, marginLeft:"auto",
            display:"flex", alignItems:"center", gap:6
          }}>✕ Réinitialiser</button>
        )}
      </div>

      {/* ── RESULTS ── */}
      {hasFilter ? (
        // Unified results when searching or filtering
        <>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
            <h2 style={{ fontSize:20, fontFamily:F.title, fontWeight:400, color:T.text, margin:0 }}>
              {filtered.length} événement{filtered.length!==1?"s":""} trouvé{filtered.length!==1?"s":""}
            </h2>
            <p style={{ fontSize:13, color:T.sec, fontFamily:F.body, margin:0 }}>
              {query && `"${query}"`}{query && activeCat!=="Tous" && " · "}{activeCat!=="Tous" && activeCat}
            </p>
          </div>
          {filtered.length > 0 ? (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
              {filtered.map((ev,i) => (
                <EventCard key={ev.id} ev={ev} idx={i} onClick={ev => navigate("detail", ev)} onLike={onLike} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign:"center", padding:"80px 0", color:T.sec }}>
              <div style={{ fontSize:48, marginBottom:12 }}>🔭</div>
              <p style={{ fontWeight:600, fontSize:16, fontFamily:F.body, margin:0 }}>Aucun résultat</p>
              <p style={{ fontSize:14, fontFamily:F.body, marginTop:8, color:T.sec }}>
                Essaie une autre catégorie ou un autre mot-clé
              </p>
            </div>
          )}
        </>
      ) : (
        // Default home layout
        <>
          <SectionTitle action="Voir tout">Actualité</SectionTitle>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, marginBottom:48 }}>
            {events.slice(0,3).map((ev,i) => (
              <EventCard key={ev.id} ev={ev} idx={i} onClick={ev => navigate("detail", ev)} onLike={onLike} />
            ))}
          </div>

          <SectionTitle action="Voir tout">Suggestions pour toi</SectionTitle>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:20 }}>
            {events.slice(0,4).map((ev,i) => (
              <EventCard key={ev.id} ev={ev} idx={i+3} onClick={ev => navigate("detail", ev)} onLike={onLike} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ── SEARCH VIEW ────────────────────────────────────────────
function SearchView({ events, navigate, onLike }) {
  const [query, setQuery] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const results = query.trim()
    ? events.filter(e => [e.title,e.cat,e.loc].some(s => s.toLowerCase().includes(query.toLowerCase())))
    : events;

  return (
    <div style={{ paddingBottom:64 }}>
      <h1 style={{ fontSize:28, fontFamily:F.title, fontWeight:400, color:T.text, marginBottom:24 }}>
        Recherche à Bordeaux
      </h1>

      <div style={{
        background:T.card, borderRadius:16, padding:"14px 20px",
        display:"flex", alignItems:"center", gap:12, marginBottom:16,
        border:`2px solid ${focused ? T.coral : T.border}`,
        boxShadow:"0 2px 12px rgba(93,42,66,0.06)", transition:"border 0.2s"
      }}>
        <span style={{ fontSize:18, opacity:0.35 }}>🔍</span>
        <input value={query} onChange={e=>setQuery(e.target.value)}
          onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
          placeholder="Événement, lieu, catégorie…"
          style={{ border:"none", outline:"none", background:"none",
            fontSize:15, fontWeight:500, color:T.text, flex:1, fontFamily:F.body }} />
        {query && (
          <button onClick={()=>setQuery("")} style={{
            color:T.sec, background:"none", border:"none", cursor:"pointer", fontSize:18
          }}>✕</button>
        )}
      </div>

      {!query && (
        <div style={{ display:"flex", gap:8, marginBottom:32, flexWrap:"wrap" }}>
          {["🎓 Révisions","☕ Coworking","🎵 Musique","🏄 Sport","🌙 Sortie"].map(t => (
            <button key={t} onClick={()=>setQuery(t.split(" ")[1])} style={{
              background:T.card, border:`1.5px solid ${T.border}`, borderRadius:50,
              padding:"7px 16px", fontWeight:600, fontSize:13, color:T.text,
              cursor:"pointer", fontFamily:F.body
            }}>{t}</button>
          ))}
        </div>
      )}

      <p style={{ fontSize:12, color:T.sec, fontWeight:600, fontFamily:F.body,
        marginBottom:20, textTransform:"uppercase", letterSpacing:"0.06em" }}>
        {query ? `${results.length} résultat${results.length!==1?"s":""}` : "Tous les événements"}
      </p>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
        {results.map((ev,i) => (
          <EventCard key={ev.id} ev={ev} idx={i} onClick={ev => navigate("detail", ev)} onLike={onLike} />
        ))}
        {results.length===0 && (
          <div style={{ gridColumn:"1/-1", textAlign:"center", padding:"80px 0", color:T.sec }}>
            <div style={{ fontSize:48, marginBottom:12 }}>🔭</div>
            <p style={{ fontWeight:600, fontSize:16, fontFamily:F.body }}>Aucun résultat trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── EVENT DETAIL ───────────────────────────────────────────
function EventDetailView({ ev, navigate, onJoin, onLike }) {
  const idx = EVENTS_DATA.findIndex(e => e.id === ev.id);
  const parts = PCOUNT[idx >= 0 ? idx : 0];
  const [joined, setJoined] = React.useState(ev.joined);
  const liked = !!ev.liked;

  const infoItems = [
    { icon:"📅", label:"Date", val:`${ev.date} · ${ev.time}` },
    { icon:"📍", label:"Lieu", val:ev.loc },
    { icon:"🗺️", label:"Adresse", val:ev.address },
    { icon:"👤", label:"Organisé par", val:ev.host },
  ];

  return (
    <div style={{ paddingBottom:64 }}>
      <button onClick={() => navigate(-1)} style={{
        display:"flex", alignItems:"center", gap:8, marginBottom:24,
        color:T.sec, background:"none", border:"none", cursor:"pointer",
        fontFamily:F.body, fontWeight:600, fontSize:14
      }}>← Retour</button>

      <div style={{ borderRadius:24, overflow:"hidden", height:400, marginBottom:40 }}>
        <img src={ev.img} alt={ev.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 340px", gap:40, alignItems:"start" }}>
        {/* Left */}
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
            <Badge>{ev.cat}</Badge>
            {joined && <Badge color="#059669">✓ Tu participes</Badge>}
          </div>
          <h1 style={{ fontSize:30, fontFamily:F.title, fontWeight:400, color:T.text, marginBottom:24, lineHeight:1.2 }}>
            {ev.title}
          </h1>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:32 }}>
            {infoItems.map(({icon,label,val}) => (
              <div key={label} style={{
                background:T.muted, borderRadius:14, padding:"16px",
                border:`1px solid ${T.border}`
              }}>
                <p style={{ fontSize:12, color:T.sec, fontWeight:600, fontFamily:F.body, marginBottom:4 }}>{icon} {label}</p>
                <p style={{ fontSize:14, fontWeight:600, color:T.text, fontFamily:F.body, margin:0 }}>{val}</p>
              </div>
            ))}
          </div>

          <div style={{ background:T.card, borderRadius:16, padding:"24px", border:`1px solid ${T.border}`, marginBottom:24 }}>
            <h3 style={{ fontSize:16, fontFamily:F.title, fontWeight:400, color:T.text, marginBottom:12 }}>Description</h3>
            <p style={{ fontSize:15, color:T.text, lineHeight:1.75, margin:0, fontFamily:F.body, fontWeight:400 }}>{ev.desc}</p>
          </div>

          <div style={{ background:T.card, borderRadius:16, padding:"24px", border:`1px solid ${T.border}` }}>
            <h3 style={{ fontSize:16, fontFamily:F.title, fontWeight:400, color:T.text, marginBottom:16 }}>
              Participants ({parts})
            </h3>
            <ParticipantDots count={parts} />
          </div>
        </div>

        {/* Right sticky card */}
        <div style={{
          background:T.card, borderRadius:20, padding:"28px",
          border:`1px solid ${T.border}`,
          boxShadow:"0 4px 24px rgba(93,42,66,0.1)",
          position:"sticky", top:88
        }}>
          <h2 style={{ fontSize:18, fontFamily:F.title, fontWeight:400, color:T.text, marginBottom:4, lineHeight:1.3 }}>
            {ev.title}
          </h2>
          <p style={{ fontSize:14, color:T.sec, fontFamily:F.body, fontWeight:500, marginBottom:24 }}>
            {ev.date} · {ev.time}
          </p>

          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24 }}>
            <Avatar init={ev.hostInit} color={ev.hostColor} size={40} />
            <div>
              <p style={{ fontSize:12, color:T.sec, fontFamily:F.body, margin:0 }}>Organisé par</p>
              <p style={{ fontWeight:700, fontSize:15, color:T.text, fontFamily:F.body, margin:0 }}>{ev.host}</p>
            </div>
          </div>

          <div style={{ marginBottom:24 }}>
            <ParticipantDots count={parts} />
          </div>

          <button onClick={() => { setJoined(!joined); onJoin(ev.id); }} className={joined ? "sv-btn-ghost" : "sv-btn-primary"} style={{
            width:"100%", padding:"15px", borderRadius:14, fontWeight:700,
            fontSize:16, cursor:"pointer", border:"none", fontFamily:F.body,
            background: joined ? T.lilac : T.coral,
            color: joined ? T.coral : "#fff",
            boxShadow: joined ? "none" : "0 6px 20px rgba(251,99,118,0.35)",
            transition:"all 0.2s", marginBottom:12
          }}>
            {joined ? "✓ Tu participes déjà" : "Rejoindre l'événement"}
          </button>

          {joined && (
            <button onClick={() => { setJoined(false); onJoin(ev.id); }} style={{
              width:"100%", padding:"10px", borderRadius:12, fontWeight:600,
              fontSize:13, cursor:"pointer", border:`1.5px solid ${T.border}`,
              background:"transparent", color:T.sec, fontFamily:F.body, marginBottom:12
            }}>Se désinscrire</button>
          )}

          <button onClick={() => navigate("messages")} style={{
            width:"100%", padding:"11px", borderRadius:12, fontWeight:600,
            fontSize:14, cursor:"pointer", border:`1.5px solid ${T.border}`,
            background:"transparent", color:T.text, fontFamily:F.body, marginBottom:8
          }}>💬 Contacter l'organisateur</button>

          {onLike && (
            <button onClick={() => onLike(ev.id)} style={{
              width:"100%", padding:"11px", borderRadius:12, fontWeight:600,
              fontSize:14, cursor:"pointer",
              border:`1.5px solid ${liked ? T.coral : T.border}`,
              background: liked ? T.lilac : "transparent",
              color: liked ? T.coral : T.text,
              fontFamily:F.body, transition:"all 0.18s"
            }}>{liked ? "♥ Retirer des favoris" : "♡ Ajouter aux favoris"}</button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── MESSAGES VIEW ──────────────────────────────────────────
function MessagesView() {
  const [active, setActive] = React.useState(0);
  const [draft, setDraft] = React.useState("");
  const [convos, setConvos] = React.useState(CONVOS_DATA.map(c => ({...c, msgs:[...c.msgs]})));
  const convo = convos[active];

  const send = () => {
    if (!draft.trim()) return;
    setConvos(prev => prev.map((c,i) => i===active
      ? {...c, msgs:[...c.msgs, {me:true, txt:draft}], preview:draft, unread:0}
      : c));
    setDraft("");
  };

  return (
    <div style={{
      display:"grid", gridTemplateColumns:"300px 1fr",
      height:"calc(100vh - 64px - 80px)", background:T.card,
      borderRadius:20, overflow:"hidden",
      border:`1px solid ${T.border}`,
      boxShadow:"0 4px 24px rgba(93,42,66,0.08)"
    }}>
      {/* Sidebar */}
      <div style={{ borderRight:`1px solid ${T.border}`, display:"flex", flexDirection:"column" }}>
        <div style={{ padding:"20px 16px", borderBottom:`1px solid ${T.border}` }}>
          <h2 style={{ fontSize:18, fontFamily:F.title, fontWeight:400, color:T.text, margin:0 }}>Messages</h2>
        </div>
        <div style={{ overflowY:"auto", flex:1 }}>
          {convos.map((c,i) => (
            <button key={c.id} onClick={()=>setActive(i)} className="sv-convo-row" style={{
              width:"100%", padding:"14px 16px",
              display:"flex", gap:12, alignItems:"center", textAlign:"left",
              background: active===i ? T.muted : "none",
              border:"none", borderBottom:`1px solid ${T.border}`,
              cursor:"pointer", fontFamily:F.body
            }}>
              <div style={{ position:"relative", flexShrink:0 }}>
                <Avatar init={c.init} color={c.color} size={44} />
                {c.unread>0 && (
                  <div style={{
                    position:"absolute", top:-2, right:-2,
                    background:T.coral, borderRadius:50, width:18, height:18,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:10, color:"#fff", fontWeight:700
                  }}>{c.unread}</div>
                )}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
                  <span style={{ fontWeight:700, fontSize:14, color:T.text }}>{c.name}</span>
                  <span style={{ fontSize:11, color:T.sec, fontWeight:500 }}>{c.time}</span>
                </div>
                <div style={{
                  fontSize:13, color:T.sec, fontWeight:c.unread>0?600:400,
                  whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"
                }}>{c.preview}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div style={{ display:"flex", flexDirection:"column" }}>
        <div style={{ padding:"16px 24px", borderBottom:`1px solid ${T.border}`,
          display:"flex", alignItems:"center", gap:12 }}>
          <Avatar init={convo.init} color={convo.color} size={40} />
          <div>
            <p style={{ fontWeight:700, fontSize:16, color:T.text, margin:0, fontFamily:F.body }}>{convo.name}</p>
            <p style={{ fontSize:12, color:"#22c55e", fontWeight:600, margin:0, fontFamily:F.body }}>En ligne</p>
          </div>
        </div>

        <div style={{ flex:1, overflowY:"auto", padding:"24px", display:"flex", flexDirection:"column", gap:12 }}>
          {convo.msgs.map((m,i) => (
            <div key={i} style={{ display:"flex", justifyContent:m.me?"flex-end":"flex-start" }}>
              {!m.me && <div style={{marginRight:8,alignSelf:"flex-end"}}><Avatar init={convo.init} color={convo.color} size={28} /></div>}
              <div style={{
                background: m.me ? T.coral : T.muted,
                color: m.me ? "#fff" : T.text,
                borderRadius: m.me ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                padding:"11px 16px", fontSize:14, fontWeight:500, fontFamily:F.body,
                maxWidth:"60%", lineHeight:1.55,
                marginLeft: !m.me ? 4 : 0
              }}>{m.txt}</div>
            </div>
          ))}
        </div>

        <div style={{ padding:"16px 24px", borderTop:`1px solid ${T.border}`,
          display:"flex", gap:12, alignItems:"center" }}>
          <input value={draft} onChange={e=>setDraft(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&send()}
            placeholder="Écrire un message…"
            style={{
              flex:1, background:T.muted, border:`1.5px solid ${T.border}`, borderRadius:50,
              padding:"12px 20px", fontSize:14, fontWeight:500, color:T.text,
              fontFamily:F.body, outline:"none"
            }} />
          <button onClick={send} className="sv-btn-primary" style={{
            width:46, height:46, borderRadius:46, background:T.coral, border:"none",
            cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:18, boxShadow:"0 4px 12px rgba(251,99,118,0.3)"
          }}>➤</button>
        </div>
      </div>
    </div>
  );
}

// ── PROFILE VIEW ───────────────────────────────────────────
function ProfileView({ events, navigate, onLike }) {
  const joinedAll = events.filter(e => e.joined);
  const upcoming = joinedAll.slice(0,3);
  const past = events.filter(e => !e.joined).slice(0,2);
  const liked = events.filter(e => e.liked);

  return (
    <div style={{ paddingBottom:64 }}>
      {/* Header banner */}
      <div style={{
        background:`linear-gradient(135deg, ${T.purple} 0%, #8B3A5C 100%)`,
        borderRadius:24, padding:"40px 40px", marginBottom:32,
        display:"flex", alignItems:"center", gap:32
      }}>
        <div style={{
          width:96, height:96, borderRadius:96, background:T.coral,
          border:"4px solid rgba(255,255,255,0.25)",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:38, fontWeight:700, color:"#fff", flexShrink:0, fontFamily:F.body
        }}>M</div>
        <div style={{ flex:1 }}>
          <h1 style={{ fontSize:24, fontFamily:F.title, fontWeight:400, color:"#fff", marginBottom:4 }}>Marie Dupont</h1>
          <p style={{ fontSize:14, color:"rgba(255,255,255,0.6)", fontFamily:F.body, fontWeight:500, marginBottom:20 }}>
            @marie.dupont · Droit, Bordeaux
          </p>
          <div style={{ display:"flex", gap:32 }}>
            {[[String(joinedAll.length),"Événements"],["12","Amis"],["3","Créés"],[String(liked.length),"Favoris"]].map(([n,l])=>(
              <div key={l}>
                <p style={{ fontSize:22, fontFamily:F.title, fontWeight:400, color:"#fff", margin:0 }}>{n}</p>
                <p style={{ fontSize:12, color:"rgba(255,255,255,0.55)", fontFamily:F.body, margin:0 }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          <button style={{
            background:"rgba(255,255,255,0.15)", color:"#fff",
            border:"1.5px solid rgba(255,255,255,0.25)", borderRadius:12,
            padding:"11px 24px", fontWeight:700, fontSize:14,
            cursor:"pointer", fontFamily:F.body
          }}>✏️ Modifier le profil</button>
          <button style={{
            background:"rgba(255,255,255,0.08)", color:"rgba(255,255,255,0.65)",
            border:"1.5px solid rgba(255,255,255,0.15)", borderRadius:12,
            padding:"11px 24px", fontWeight:600, fontSize:14,
            cursor:"pointer", fontFamily:F.body
          }}>📤 Partager</button>
        </div>
      </div>

      {/* Bio */}
      <div style={{ background:T.card, borderRadius:16, padding:"20px 24px",
        border:`1px solid ${T.border}`, marginBottom:40 }}>
        <p style={{ fontSize:12, fontWeight:600, color:T.sec, fontFamily:F.body, marginBottom:8, textTransform:"uppercase", letterSpacing:"0.06em" }}>À propos</p>
        <p style={{ fontSize:15, color:T.text, lineHeight:1.7, margin:0, fontFamily:F.body, fontWeight:400 }}>
          Étudiante en droit à Bordeaux 🎓 · Passionnée de musique, surf et coworking au bord de la Garonne ☕
        </p>
      </div>

      {/* Favoris */}
      <SectionTitle>♥ Mes favoris</SectionTitle>
      {liked.length > 0 ? (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, marginBottom:48 }}>
          {liked.map((ev,i) => (
            <EventCard key={ev.id} ev={ev} idx={i} onClick={ev => navigate("detail", ev)} onLike={onLike} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign:"center", padding:"40px", color:T.sec,
          background:T.card, borderRadius:16, marginBottom:48, border:`1px solid ${T.border}` }}>
          <div style={{fontSize:36,marginBottom:8}}>♡</div>
          <p style={{fontWeight:600, fontFamily:F.body, margin:0}}>
            Aucun favori — clique sur le ♡ d'une activité pour la sauvegarder
          </p>
        </div>
      )}

      {/* Upcoming */}
      <SectionTitle action="Voir tout">Événements à venir</SectionTitle>
      {upcoming.length > 0 ? (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, marginBottom:48 }}>
          {upcoming.map((ev,i) => (
            <EventCard key={ev.id} ev={ev} idx={i} onClick={ev => navigate("detail", ev)} onLike={onLike} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign:"center", padding:"40px", color:T.sec,
          background:T.card, borderRadius:16, marginBottom:48, border:`1px solid ${T.border}` }}>
          <div style={{fontSize:36,marginBottom:8}}>📅</div>
          <p style={{fontWeight:600, fontFamily:F.body, margin:0}}>Aucun événement à venir — rejoins-en un !</p>
        </div>
      )}

      {/* Past */}
      <SectionTitle>Événements passés</SectionTitle>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:16 }}>
        {past.map((ev) => (
          <div key={ev.id} onClick={()=>navigate("detail",ev)} className="sv-past-card" style={{
            background:T.card, borderRadius:16, overflow:"hidden",
            display:"flex", border:`1px solid ${T.border}`,
            cursor:"pointer", opacity:0.7, transition:"opacity 0.18s"
          }}
          onMouseEnter={e=>e.currentTarget.style.opacity="1"}
          onMouseLeave={e=>e.currentTarget.style.opacity="0.7"}>
            <img src={ev.img} alt={ev.title} style={{width:96,height:88,objectFit:"cover",flexShrink:0}} />
            <div style={{ padding:"14px 16px", flex:1, minWidth:0 }}>
              <Badge>{ev.cat}</Badge>
              <p style={{ fontWeight:600, fontSize:14, color:T.text, margin:"6px 0 4px",
                whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", fontFamily:F.body }}>{ev.title}</p>
              <p style={{ fontSize:12, color:T.sec, margin:0, fontFamily:F.body }}>{ev.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── AUTH VIEW ──────────────────────────────────────────────
function AuthView({ navigate }) {
  const [isLogin, setIsLogin] = React.useState(true);
  const [form, setForm] = React.useState({name:"",email:"",password:""});
  const set = k => e => setForm(f=>({...f,[k]:e.target.value}));

  return (
    <div style={{
      minHeight:"calc(100vh - 64px)", display:"flex",
      alignItems:"center", justifyContent:"center", padding:"40px 0"
    }}>
      <div style={{ width:"100%", maxWidth:440 }}>
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <h1 style={{ fontSize:32, fontFamily:F.title, fontWeight:400, color:T.coral, marginBottom:8 }}>
            Study Vibes
          </h1>
          <p style={{ fontSize:14, color:T.sec, fontFamily:F.body, fontWeight:500, margin:0 }}>
            {isLogin ? "Content de te revoir 👋" : "Rejoins la communauté bordelaise 🎓"}
          </p>
        </div>

        <div style={{ background:T.card, borderRadius:24, padding:"36px",
          boxShadow:"0 8px 40px rgba(93,42,66,0.12)", border:`1px solid ${T.border}` }}>

          {/* Toggle */}
          <div style={{ display:"flex", background:T.muted, borderRadius:14, padding:4, marginBottom:28 }}>
            {["Connexion","Inscription"].map((l,i) => (
              <button key={l} onClick={()=>setIsLogin(i===0)} style={{
                flex:1, padding:"10px", borderRadius:11,
                fontWeight:700, fontSize:14, fontFamily:F.body,
                background: (isLogin?i===0:i===1) ? T.card : "transparent",
                color: (isLogin?i===0:i===1) ? T.text : T.sec,
                border:"none", cursor:"pointer",
                boxShadow: (isLogin?i===0:i===1) ? "0 2px 8px rgba(93,42,66,0.08)" : "none",
                transition:"all 0.2s"
              }}>{l}</button>
            ))}
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:16, marginBottom:24 }}>
            {!isLogin && <Input label="Prénom & Nom" placeholder="Marie Dupont" value={form.name} onChange={set("name")} required />}
            <Input label="Adresse e-mail" type="email" placeholder="marie@u-bordeaux.fr" value={form.email} onChange={set("email")} required />
            <Input label="Mot de passe" type="password" placeholder="••••••••" value={form.password} onChange={set("password")} required />
          </div>

          {isLogin && (
            <div style={{ textAlign:"right", marginBottom:20 }}>
              <button style={{ fontSize:13, color:T.coral, fontWeight:600,
                background:"none", border:"none", cursor:"pointer", fontFamily:F.body }}>
                Mot de passe oublié ?
              </button>
            </div>
          )}

          <button onClick={()=>navigate("home")} className="sv-btn-primary" style={{
            width:"100%", padding:"14px", background:T.coral, color:"#fff",
            border:"none", borderRadius:14, fontFamily:F.body,
            fontWeight:700, fontSize:16, cursor:"pointer",
            boxShadow:"0 4px 16px rgba(251,99,118,0.35)"
          }}>
            {isLogin ? "Se connecter" : "Créer mon compte"}
          </button>

          <p style={{ textAlign:"center", marginTop:20, fontSize:13, color:T.sec, fontFamily:F.body, margin:"20px 0 0" }}>
            {isLogin ? "Pas encore de compte ? " : "Déjà un compte ? "}
            <button onClick={()=>setIsLogin(!isLogin)} style={{
              color:T.coral, fontWeight:700, background:"none", border:"none",
              cursor:"pointer", fontFamily:F.body
            }}>{isLogin ? "S'inscrire" : "Se connecter"}</button>
          </p>
        </div>
      </div>
    </div>
  );
}

// ── CREATE EVENT VIEW ──────────────────────────────────────
function CreateEventView({ navigate }) {
  const [form, setForm] = React.useState({title:"",desc:"",date:"",time:"",loc:"",address:"",cat:"Révisions"});
  const set = k => e => setForm(f=>({...f,[k]:e.target.value}));

  return (
    <div style={{ paddingBottom:64 }}>
      <button onClick={()=>navigate(-1)} style={{
        display:"flex", alignItems:"center", gap:8, marginBottom:24,
        color:T.sec, background:"none", border:"none", cursor:"pointer",
        fontFamily:F.body, fontWeight:600, fontSize:14
      }}>← Retour</button>

      <div style={{ maxWidth:720, margin:"0 auto" }}>
        <h1 style={{ fontSize:28, fontFamily:F.title, fontWeight:400, color:T.text, marginBottom:8 }}>
          Créer un événement
        </h1>
        <p style={{ fontSize:15, color:T.sec, fontFamily:F.body, marginBottom:36, fontWeight:400 }}>
          Invite la communauté bordelaise à rejoindre ton activité
        </p>

        <div style={{ background:T.card, borderRadius:20, padding:"36px",
          border:`1px solid ${T.border}`, display:"flex", flexDirection:"column", gap:24 }}>

          <Input label="Titre de l'événement" placeholder="Ex : Session révisions droit constitutionnel" value={form.title} onChange={set("title")} required />

          {/* Catégorie */}
          <div>
            <label style={{ fontSize:13, fontWeight:600, color:T.text, fontFamily:F.body, display:"block", marginBottom:8 }}>
              Catégorie <span style={{color:T.coral}}>*</span>
            </label>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {CATS.filter(c=>c!=="Tous").map(c=>(
                <button key={c} onClick={()=>setForm(f=>({...f,cat:c}))} style={{
                  padding:"8px 18px", borderRadius:50, fontWeight:600, fontSize:13,
                  background: form.cat===c ? T.coral : T.muted,
                  color: form.cat===c ? "#fff" : T.text,
                  border:`1.5px solid ${form.cat===c ? T.coral : T.border}`,
                  cursor:"pointer", fontFamily:F.body, transition:"all 0.18s"
                }}>{c}</button>
              ))}
            </div>
          </div>

          <Input label="Description" placeholder="Décris ton événement, le programme, ce qu'il faut apporter…" value={form.desc} onChange={set("desc")} textarea required />

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            <Input label="Date" type="date" value={form.date} onChange={set("date")} required />
            <Input label="Heure" type="time" value={form.time} onChange={set("time")} required />
          </div>

          <Input label="Nom du lieu" placeholder="Ex : Darwin Écosystème, BU Montaigne…" value={form.loc} onChange={set("loc")} required />
          <Input label="Adresse complète" placeholder="Ex : 87 quai des Queyries, Bordeaux" value={form.address} onChange={set("address")} required />

          <div style={{ display:"flex", gap:12, paddingTop:8 }}>
            <button onClick={()=>navigate("home")} className="sv-btn-primary" style={{
              flex:1, padding:"15px", background:T.coral, color:"#fff",
              border:"none", borderRadius:14, fontFamily:F.body,
              fontWeight:700, fontSize:16, cursor:"pointer",
              boxShadow:"0 4px 16px rgba(251,99,118,0.3)"
            }}>✨ Publier l'événement</button>
            <button onClick={()=>navigate(-1)} style={{
              padding:"15px 24px", background:"transparent", color:T.sec,
              border:`1.5px solid ${T.border}`, borderRadius:14,
              fontFamily:F.body, fontWeight:600, fontSize:14, cursor:"pointer"
            }}>Annuler</button>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  HomeView, SearchView, EventDetailView,
  MessagesView, ProfileView, AuthView, CreateEventView
});
