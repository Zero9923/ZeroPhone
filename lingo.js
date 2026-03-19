// 动态注入 Lingo 界面 HTML
const lingoUI = `
<div id="screen-chat" class="absolute inset-0 bg-[#E5E5EA] flex flex-col transition-transform duration-[400ms] ease-[cubic-bezier(0.32,0.72,0,1)] w-full h-full z-30 translate-x-full font-modern">
    <div id="page-chat" class="absolute inset-0 flex flex-col z-10 bg-white transition-opacity duration-300 opacity-100 pb-[80px]">
        <div class="pt-12 pb-2 px-5 flex items-center justify-between z-20 bg-white/90 backdrop-blur-md">
            <div class="flex items-center gap-3">
                <button onclick="window.closeApp('screen-chat')" class="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center active:scale-90 transition-transform cursor-pointer">
                    <svg class="w-5 h-5 text-zinc-900 pr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <h1 class="text-2xl font-bold text-zinc-900 tracking-tight">Chats</h1>
            </div>
            <button onclick="window.toggleSearch()" class="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center active:scale-90 transition-transform cursor-pointer">
                <svg class="w-4 h-4 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
        </div>
        <div id="search-container" class="px-5 max-h-0 opacity-0 overflow-hidden transition-all duration-300 ease-in-out">
            <div class="flex items-center gap-3 pb-2 pt-1">
                <div class="flex-1 bg-zinc-100 rounded-xl px-3 py-2 flex items-center">
                    <svg class="w-4 h-4 text-zinc-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    <input id="search-input" type="text" placeholder="Search..." class="bg-transparent border-none outline-none text-[13px] w-full font-medium text-zinc-900" oninput="window.handleSearch(this.value)" />
                </div>
                <button onclick="window.toggleSearch()" class="text-[13px] font-semibold text-zinc-500 active:text-zinc-900 transition-colors">Cancel</button>
            </div>
        </div>
        <div class="px-5 py-2 flex items-start gap-4 overflow-x-auto no-scrollbar border-b border-zinc-100 min-h-[80px] transition-all duration-300" id="top-avatars-container">
            <div class="text-xs text-zinc-400 font-medium py-3 italic w-full text-center" id="empty-avatar-text">还没有角色哦，快去 Create 添加吧～</div>
        </div>
        <div class="flex-1 overflow-y-auto no-scrollbar flex flex-col px-3 pt-2" id="chat-list-container"></div>
    </div>
    
    <div id="page-discover" class="absolute inset-0 z-0 bg-white opacity-0 pointer-events-none flex flex-col transition-opacity duration-300 pb-[80px]">
        <div class="pt-12 pb-3 px-5 flex items-center justify-between z-20 bg-white/90 backdrop-blur-md border-b border-zinc-100 sticky top-0">
            <h1 class="text-xl font-bold text-zinc-900 tracking-wide">Explore</h1>
        </div>
        <div class="flex-1 overflow-y-auto no-scrollbar p-4 flex flex-col gap-4">
            <div class="bg-zinc-50 rounded-3xl p-5 shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-zinc-100"><p class="text-[13px] leading-relaxed text-zinc-600 font-medium">No updates yet.</p></div>
        </div>
    </div>

    <div id="page-create" class="absolute inset-0 z-0 bg-white opacity-0 pointer-events-none flex flex-col transition-opacity duration-300 pb-[80px]">
        <div class="pt-12 pb-3 px-5 flex items-center justify-between z-20 bg-white/90 backdrop-blur-md border-b border-zinc-100">
            <h1 class="text-xl font-bold text-zinc-900 tracking-wide">Characters</h1>
            <button onclick="window.toggleCreateForm(true)" class="w-8 h-8 bg-zinc-900 rounded-full flex items-center justify-center text-white active:scale-95 transition-transform shadow-md"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg></button>
        </div>
        <div class="flex-1 overflow-y-auto no-scrollbar p-5 grid grid-cols-2 gap-3 content-start" id="character-grid"></div>
    </div>

    <div id="page-me" class="absolute inset-0 z-0 bg-white opacity-0 pointer-events-none flex flex-col items-center justify-center transition-opacity duration-300 pb-[80px]">
        <div class="w-20 h-20 rounded-full bg-zinc-100 flex items-center justify-center mb-4 shadow-inner">
            <svg class="w-8 h-8 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
        </div>
        <h2 class="text-[15px] font-bold text-zinc-900">User Profile</h2>
        <p class="text-xs text-zinc-400 mt-1 font-medium">Lingo Network</p>
    </div>

    <!-- 底栏导航 -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%] h-[60px] bg-white/85 backdrop-blur-xl border border-zinc-200/60 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center justify-around px-2 z-40">
        <div onclick="window.switchChatTab('chat')" id="tab-chat" class="flex flex-col items-center justify-center gap-0.5 w-1/4 h-full cursor-pointer text-black transition-all group"><svg class="w-5 h-5 group-active:scale-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg><span class="text-[9px] font-semibold tracking-wide">Chats</span></div>
        <div onclick="window.switchChatTab('discover')" id="tab-discover" class="flex flex-col items-center justify-center gap-0.5 w-1/4 h-full cursor-pointer text-zinc-400 hover:text-zinc-900 transition-all group"><svg class="w-5 h-5 group-active:scale-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span class="text-[9px] font-semibold tracking-wide">Explore</span></div>
        <div onclick="window.switchChatTab('create')" id="tab-create" class="flex flex-col items-center justify-center gap-0.5 w-1/4 h-full cursor-pointer text-zinc-400 hover:text-zinc-900 transition-all group"><svg class="w-5 h-5 group-active:scale-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg><span class="text-[9px] font-semibold tracking-wide">Create</span></div>
        <div onclick="window.switchChatTab('me')" id="tab-me" class="flex flex-col items-center justify-center gap-0.5 w-1/4 h-full cursor-pointer text-zinc-400 hover:text-zinc-900 transition-all group"><svg class="w-5 h-5 group-active:scale-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg><span class="text-[9px] font-semibold tracking-wide">Me</span></div>
    </div>

    <!-- 角色创建模态框 -->
    <div id="modal-create-form" class="absolute inset-0 z-[60] bg-white translate-y-full transition-transform duration-300 flex flex-col">
        <div class="pt-12 pb-3 px-5 flex items-center justify-between border-b border-zinc-100">
            <button onclick="window.toggleCreateForm(false)" class="text-zinc-500 font-medium text-sm">Cancel</button>
            <h2 id="modal-form-title" class="text-base font-bold text-zinc-900">New Entity</h2>
            <div class="w-10"></div> 
        </div>
        <div class="flex-1 overflow-y-auto p-6 flex flex-col gap-5 pb-20">
            <div class="flex flex-col items-center justify-center pt-1 pb-2">
                <div class="relative cursor-pointer group active:scale-95 transition-transform" onclick="document.getElementById('avatar-upload').click()">
                    <div class="w-24 h-24 rounded-full bg-zinc-50 border border-zinc-200 flex flex-col items-center justify-center text-zinc-300 overflow-hidden shadow-sm">
                        <img id="avatar-preview" src="" class="w-full h-full object-cover hidden" />
                        <svg id="avatar-icon" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                </div>
                <input type="file" id="avatar-upload" accept="image/*" class="hidden" onchange="window.handleAvatarUpload(event)">
            </div>
            <div class="relative"><label class="text-[11px] font-semibold text-zinc-500 uppercase block mb-1.5">Codename</label><input id="input-name" type="text" class="w-full bg-zinc-50 border-none px-4 py-3 text-[13px] rounded-xl outline-none" /></div>
            <div class="flex gap-4">
                <div class="flex-1 relative"><label class="text-[11px] font-semibold text-zinc-500 uppercase block mb-1.5">Gender</label><input id="input-gender" type="text" class="w-full bg-zinc-50 border-none px-4 py-3 text-[13px] rounded-xl outline-none" /></div>
                <div class="flex-1 relative"><label class="text-[11px] font-semibold text-zinc-500 uppercase block mb-1.5">Age</label><input id="input-age" type="number" class="w-full bg-zinc-50 border-none px-4 py-3 text-[13px] rounded-xl outline-none" /></div>
            </div>
            <div class="relative"><label class="text-[11px] font-semibold text-zinc-500 uppercase block mb-1.5">Directives</label><textarea id="input-prompt" class="w-full bg-zinc-50 border-none px-4 py-3 text-[13px] rounded-xl min-h-[100px] resize-none outline-none"></textarea></div>
            <button onclick="window.saveCharacter()" class="mt-2 w-full bg-zinc-900 text-white py-3.5 text-[13px] font-semibold active:scale-95 transition-all rounded-xl shadow-lg">Save Entity</button>
        </div>
    </div>

    <!-- 真实聊天室模态框 -->
    <div id="page-chat-room" class="absolute inset-0 z-[70] bg-[#F2F2F7] translate-x-full transition-transform duration-300 flex flex-col">
        <div class="pt-12 pb-3 px-4 flex items-center justify-between bg-white/90 backdrop-blur-md border-b border-zinc-200 z-10 shadow-sm">
            <button onclick="window.closeChatRoom()" class="flex items-center text-zinc-900 active:opacity-50">
                <svg class="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
                <span class="font-medium text-[15px]">Back</span>
            </button>
            <div class="flex flex-col items-center justify-center absolute left-1/2 -translate-x-1/2">
                <span id="chat-room-name" class="font-semibold text-[15px] text-zinc-900">Name</span>
            </div>
            <div class="w-12"></div>
        </div>
        
        <div class="flex-1 overflow-y-auto p-4 flex flex-col gap-1 pb-6" id="chat-messages" onmousedown="document.getElementById('chat-input').blur()" ontouchstart="document.getElementById('chat-input').blur()"></div>
        
        <div class="bg-white border-t border-zinc-100 px-3 py-3 pb-8 flex items-end gap-2 z-10">
            <div class="flex-1 bg-zinc-100 rounded-2xl px-4 py-2 min-h-[40px] flex items-center">
                <input id="chat-input" type="text" placeholder="Message..." class="w-full bg-transparent border-none text-[13px] outline-none font-medium text-zinc-900" onkeypress="window.handleEnter(event)" />
            </div>
            <button onclick="window.receiveMessage()" class="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-900 active:scale-90 transition-transform flex-shrink-0" title="Generate Reply">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
            </button>
            <button onclick="window.sendMessage()" class="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center text-white active:scale-90 transition-transform flex-shrink-0" title="Send Message">
                <svg class="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </button>
        </div>
    </div>

    <!-- 长按删除弹窗 -->
    <div id="delete-modal" class="absolute inset-0 z-[80] flex items-center justify-center bg-zinc-900/40 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300 font-modern">
        <div id="delete-modal-card" class="bg-white p-6 w-[80%] max-w-[300px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] transform scale-95 transition-transform duration-300 flex flex-col gap-5 rounded-3xl">
            <div class="text-center mt-2">
                <h3 id="delete-modal-title" class="text-lg font-bold text-zinc-900 tracking-tight">Delete?</h3>
                <p id="delete-modal-desc" class="text-[13px] text-zinc-500 mt-1 leading-snug">This action cannot be undone.</p>
            </div>
            <div class="flex flex-col gap-2 mt-2">
                <button onclick="window.executeDelete()" class="w-full py-3.5 bg-red-500 text-white text-[14px] font-bold active:scale-95 transition-transform rounded-xl shadow-sm">Delete</button>
                <button onclick="window.closeDeleteModal()" class="w-full py-3.5 bg-zinc-100 text-zinc-600 text-[14px] font-bold active:scale-95 transition-transform rounded-xl">Cancel</button>
            </div>
        </div>
    </div>
</div>
`;

document.getElementById('app-container').insertAdjacentHTML('beforeend', lingoUI);

// ==============================
// 💬 Lingo 逻辑
// ==============================
window.characters = JSON.parse(window.safeGet('lingo_chars') || '[]'); 
window.chats = JSON.parse(window.safeGet('lingo_chats') || '[]'); 
window.chatHistories = JSON.parse(window.safeGet('lingo_histories') || '{}'); 

let currentChatId = null; let currentUploadedAvatarUrl = null; let editingCharId = null; let isSearchOpen = false;
let isReceiving = false; 

const gradients = ['from-blue-400 to-indigo-500','from-pink-400 to-rose-500','from-amber-400 to-orange-500','from-emerald-400 to-teal-500'];

window.saveAllLingoData = function() {
    window.safeSet('lingo_chars', JSON.stringify(window.characters));
    window.safeSet('lingo_chats', JSON.stringify(window.chats));
    window.safeSet('lingo_histories', JSON.stringify(window.chatHistories));
};

let pressTimer = null; let isLongPressTrigged = false; let deleteTarget = { type: null, id: null };
window.startPress = function(e, type, id) {
    isLongPressTrigged = false;
    pressTimer = setTimeout(() => { isLongPressTrigged = true; window.showDeleteModal(type, id); }, 600); 
};
window.cancelPress = function() { if(pressTimer) clearTimeout(pressTimer); };

window.showDeleteModal = function(type, id) {
    deleteTarget = { type, id };
    const title = document.getElementById('delete-modal-title');
    const desc = document.getElementById('delete-modal-desc');
    const char = window.characters.find(c => c.id === id);
    if(type === 'character') { title.innerText = `Delete ${char.name}?`; desc.innerText = "This will permanently delete the character and all related chat records."; } 
    else if(type === 'chat') { title.innerText = `Clear Chat?`; desc.innerText = `This will clear all messages with ${char.name}. The character will remain.`; }
    const modal = document.getElementById('delete-modal'); const card = document.getElementById('delete-modal-card');
    modal.classList.remove('opacity-0', 'pointer-events-none'); card.classList.remove('scale-95'); card.classList.add('scale-100');
    if (navigator.vibrate) navigator.vibrate(50);
};

window.closeDeleteModal = function() {
    const modal = document.getElementById('delete-modal'); const card = document.getElementById('delete-modal-card');
    modal.classList.add('opacity-0', 'pointer-events-none'); card.classList.remove('scale-100'); card.classList.add('scale-95');
    deleteTarget = { type: null, id: null };
};

window.executeDelete = function() {
    const { type, id } = deleteTarget; if(!id) return;
    if(type === 'character') {
        window.characters = window.characters.filter(c => c.id !== id);
        window.chats = window.chats.filter(c => c.id !== id);
        delete window.chatHistories[id];
        if(currentChatId === id) currentChatId = null;
    } else if (type === 'chat') {
        window.chats = window.chats.filter(c => c.id !== id);
        window.chatHistories[id] = []; 
        if(currentChatId === id) document.getElementById('chat-messages').innerHTML = '';
    }
    window.saveAllLingoData(); window.renderCharacters(); window.renderTopAvatars(); window.renderChatList(); window.closeDeleteModal();
};

window.switchChatTab = function(tab) {
    const pages = ['chat', 'discover', 'create', 'me'];
    pages.forEach(p => {
        const el = document.getElementById(`page-${p}`); const btn = document.getElementById(`tab-${p}`);
        if (p === tab) { el.classList.remove('opacity-0', 'z-0', 'pointer-events-none'); el.classList.add('opacity-100', 'z-10'); if(btn) { btn.classList.remove('text-zinc-400'); btn.classList.add('text-black'); } } 
        else { el.classList.remove('opacity-100', 'z-10'); el.classList.add('opacity-0', 'z-0', 'pointer-events-none'); if(btn) { btn.classList.remove('text-black'); btn.classList.add('text-zinc-400'); } }
    });
};

window.toggleSearch = function() {
    isSearchOpen = !isSearchOpen; const container = document.getElementById('search-container'); const input = document.getElementById('search-input'); const avatars = document.getElementById('top-avatars-container');
    if(isSearchOpen) { container.classList.remove('max-h-0', 'opacity-0'); container.classList.add('max-h-16', 'opacity-100'); avatars.classList.add('opacity-0', 'scale-y-0', 'h-0', 'overflow-hidden'); setTimeout(() => input.focus(), 300); } 
    else { container.classList.add('max-h-0', 'opacity-0'); container.classList.remove('max-h-16', 'opacity-100'); avatars.classList.remove('opacity-0', 'scale-y-0', 'h-0', 'overflow-hidden'); input.value = ''; window.handleSearch(''); }
};

window.handleSearch = function(query) {
    const q = query.toLowerCase().trim(); const list = document.getElementById('chat-list-container');
    if (!q) { window.renderChatList(); return; }
    const charMatches = window.characters.filter(c => c.name.toLowerCase().includes(q));
    if (charMatches.length > 0) { list.innerHTML = `<div class="px-3 pb-2 pt-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Characters Found</div>` + charMatches.map(c => window.renderSearchItem(c, 'Tap to start chatting')).join(''); } 
    else { const recordMatches = window.chats.filter(c => c.prompt && c.prompt.toLowerCase().includes(q));
        if (recordMatches.length > 0) { list.innerHTML = `<div class="px-3 pb-2 pt-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Chat Records Found</div>` + recordMatches.map(c => window.renderSearchItem(c, `Matched keyword in history...`)).join(''); } 
        else { list.innerHTML = `<div class="text-center text-zinc-400 text-[13px] mt-10 font-medium">没有找到关于 "${query}" 的结果</div>`; } }
};

window.renderSearchItem = function(c, subtext) { return `<div onclick="window.openChatRoom(${c.id})" class="flex items-center gap-3 px-3 py-3 cursor-pointer hover:bg-zinc-50 rounded-2xl transition-colors">${c.avatarUrl ? `<img src="${c.avatarUrl}" class="w-11 h-11 rounded-full object-cover flex-shrink-0" />` : `<div class="w-11 h-11 rounded-full bg-gradient-to-tr ${c.color} flex items-center justify-center text-white flex-shrink-0"><span class="text-sm font-bold">${c.name.substring(0,1).toUpperCase()}</span></div>`}<div class="flex-1 border-b border-zinc-100 pb-2.5 pt-1.5"><span class="font-semibold text-[15px] text-zinc-900 block">${c.name}</span><p class="text-[13px] text-zinc-400 truncate font-medium italic">${subtext}</p></div></div>`; };

window.toggleCreateForm = function(show) {
    const modal = document.getElementById('modal-create-form');
    if (show) { editingCharId = null; document.getElementById('modal-form-title').innerText = "New Entity"; document.getElementById('input-name').value = ''; document.getElementById('input-gender').value = ''; document.getElementById('input-age').value = ''; document.getElementById('input-prompt').value = ''; window.resetAvatarUpload(); modal.classList.remove('translate-y-full'); } 
    else { modal.classList.add('translate-y-full'); }
};

window.editCharacter = function(id) {
    const char = window.characters.find(c => c.id === id); if (!char) return; editingCharId = id; document.getElementById('modal-form-title').innerText = "Edit Entity"; document.getElementById('input-name').value = char.name || ''; document.getElementById('input-gender').value = char.gender || ''; document.getElementById('input-age').value = char.age || ''; document.getElementById('input-prompt').value = char.prompt || '';
    if (char.avatarUrl) { currentUploadedAvatarUrl = char.avatarUrl; document.getElementById('avatar-preview').src = currentUploadedAvatarUrl; document.getElementById('avatar-preview').classList.remove('hidden'); document.getElementById('avatar-icon').classList.add('hidden'); } else { window.resetAvatarUpload(); }
    document.getElementById('modal-create-form').classList.remove('translate-y-full');
};

window.handleAvatarUpload = function(event) { const file = event.target.files[0]; if (file) { const reader = new FileReader(); reader.onload = e => { currentUploadedAvatarUrl = e.target.result; document.getElementById('avatar-preview').src = currentUploadedAvatarUrl; document.getElementById('avatar-preview').classList.remove('hidden'); document.getElementById('avatar-icon').classList.add('hidden'); }; reader.readAsDataURL(file); } };
window.resetAvatarUpload = function() { currentUploadedAvatarUrl = null; document.getElementById('avatar-preview').src = ''; document.getElementById('avatar-preview').classList.add('hidden'); document.getElementById('avatar-icon').classList.remove('hidden'); document.getElementById('avatar-upload').value = ''; };

window.saveCharacter = function() {
    const name = document.getElementById('input-name').value || 'Unknown'; const gender = document.getElementById('input-gender').value; const age = document.getElementById('input-age').value; const prompt = document.getElementById('input-prompt').value;
    if (editingCharId) { const char = window.characters.find(c => c.id === editingCharId); if (char) { char.name = name; char.gender = gender; char.age = age; char.prompt = prompt; char.avatarUrl = currentUploadedAvatarUrl; } } 
    else { const color = gradients[window.characters.length % gradients.length]; const newChar = { id: Date.now(), name, gender, age, prompt, color, avatarUrl: currentUploadedAvatarUrl }; window.characters.push(newChar); window.chatHistories[newChar.id] = []; }
    window.saveAllLingoData(); document.getElementById('modal-create-form').classList.add('translate-y-full'); window.renderCharacters(); window.renderTopAvatars(); window.renderChatList(); if (!editingCharId) window.switchChatTab('chat');
};

window.renderCharacters = function() {
    const grid = document.getElementById('character-grid'); if(window.characters.length === 0) { grid.innerHTML = `<div class="col-span-2 text-center text-zinc-400 text-[13px] mt-10 font-medium">点击右上角 + 创建实体</div>`; return; }
    grid.innerHTML = window.characters.map(c => `
    <div 
        onmousedown="window.startPress(event, 'character', ${c.id})" onmouseup="window.cancelPress()" onmouseleave="window.cancelPress()"
        ontouchstart="window.startPress(event, 'character', ${c.id})" ontouchend="window.cancelPress()" ontouchmove="window.cancelPress()"
        onclick="if(!isLongPressTrigged) window.editCharacter(${c.id})" 
        style="-webkit-touch-callout: none; user-select: none;"
        class="bg-zinc-50 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 border border-zinc-100 shadow-sm cursor-pointer active:scale-95 transition-transform">
        ${c.avatarUrl ? `<img src="${c.avatarUrl}" class="w-14 h-14 rounded-full object-cover ring-2 ring-white pointer-events-none" />` : `<div class="w-14 h-14 rounded-full bg-gradient-to-tr ${c.color} flex items-center justify-center text-white ring-2 ring-white pointer-events-none"><span class="text-base font-bold">${c.name.substring(0,1).toUpperCase()}</span></div>`}
        <div class="flex flex-col items-center w-full pointer-events-none">
            <span class="text-[13px] font-semibold text-zinc-800 truncate w-full text-center">${c.name}</span>
            ${(c.gender || c.age) ? `<span class="text-[10px] text-zinc-400 font-medium">${c.gender || '??'} • ${c.age || '??'}</span>` : ''}
        </div>
    </div>`).join('');
};

window.renderTopAvatars = function() {
    const container = document.getElementById('top-avatars-container');
    if (window.characters.length > 0) { 
        container.innerHTML = window.characters.map(c => `<div onclick="window.openChatRoom(${c.id})" class="flex flex-col items-center gap-1.5 cursor-pointer active:scale-95 transition-transform flex-shrink-0">${c.avatarUrl ? `<img src="${c.avatarUrl}" class="w-12 h-12 rounded-full object-cover ring-2 ring-transparent hover:ring-zinc-200 transition-all" />` : `<div class="w-12 h-12 rounded-full bg-gradient-to-tr ${c.color} flex items-center justify-center text-white ring-2 ring-transparent hover:ring-zinc-200 transition-all"><span class="text-sm font-bold">${c.name.substring(0,1).toUpperCase()}</span></div>`}<span class="text-[10px] font-semibold text-zinc-800 w-14 text-center truncate">${c.name}</span></div>`).join(''); 
    } else {
        container.innerHTML = `<div class="text-xs text-zinc-400 font-medium py-3 italic w-full text-center" id="empty-avatar-text">还没有角色哦，快去 Create 添加吧～</div>`;
    }
};

window.renderChatList = function() {
    const list = document.getElementById('chat-list-container');
    list.innerHTML = window.chats.map(c => { 
        const history = window.chatHistories[c.id] || []; const lastMsg = history.length > 0 ? history[history.length-1].text : "Start a conversation..."; 
        return `
        <div 
            onmousedown="window.startPress(event, 'chat', ${c.id})" onmouseup="window.cancelPress()" onmouseleave="window.cancelPress()"
            ontouchstart="window.startPress(event, 'chat', ${c.id})" ontouchend="window.cancelPress()" ontouchmove="window.cancelPress()"
            onclick="if(!isLongPressTrigged) window.openChatRoom(${c.id})"
            style="-webkit-touch-callout: none; user-select: none;"
            class="flex items-center gap-3 px-3 py-3 cursor-pointer hover:bg-zinc-50 rounded-2xl transition-colors">
            ${c.avatarUrl ? `<img src="${c.avatarUrl}" class="w-11 h-11 rounded-full object-cover flex-shrink-0 pointer-events-none" />` : `<div class="w-11 h-11 rounded-full bg-gradient-to-tr ${c.color} flex items-center justify-center text-white flex-shrink-0 pointer-events-none"><span class="text-sm font-bold">${c.name.substring(0,1).toUpperCase()}</span></div>`}
            <div class="flex-1 overflow-hidden border-b border-zinc-100 pb-2.5 pt-1.5 pointer-events-none">
                <div class="flex justify-between items-center mb-0.5"><span class="font-semibold text-[15px] text-zinc-900">${c.name}</span></div>
                <p class="text-[13px] text-zinc-400 truncate font-medium">${lastMsg}</p>
            </div>
        </div>`; 
    }).join('');
};

window.openChatRoom = function(charId) { currentChatId = charId; const char = window.characters.find(c => c.id === charId); document.getElementById('chat-room-name').innerText = char.name; document.getElementById('page-chat-room').classList.remove('translate-x-full'); window.renderChatMessages(); };
window.closeChatRoom = function() { document.getElementById('page-chat-room').classList.add('translate-x-full'); if (!window.chats.find(c => c.id === currentChatId)) { window.chats.push(window.characters.find(c => c.id === currentChatId)); window.saveAllLingoData(); } window.renderChatList(); };

window.renderChatMessages = function() {
    const container = document.getElementById('chat-messages'); 
    const history = window.chatHistories[currentChatId] || [];
    const char = window.characters.find(c => c.id === currentChatId);
    if (!char) return;

    const charAvatarHTML = char.avatarUrl 
        ? `<img src="${char.avatarUrl}" class="w-8 h-8 rounded-full object-cover flex-shrink-0 shadow-sm" />` 
        : `<div class="w-8 h-8 rounded-full bg-gradient-to-tr ${char.color} flex items-center justify-center text-white flex-shrink-0 shadow-sm text-xs font-bold">${char.name.charAt(0).toUpperCase()}</div>`;
        
    const userAvatarHTML = `<div class="w-8 h-8 rounded-full bg-zinc-200 border border-zinc-300 flex items-center justify-center text-zinc-500 flex-shrink-0 shadow-sm"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></div>`;

    container.innerHTML = history.map((msg, idx) => {
        const isNextSame = idx < history.length - 1 && history[idx + 1].role === msg.role;
        const isPrevSame = idx > 0 && history[idx - 1].role === msg.role;
        const renderAiAvatar = (!isNextSame && msg.role === 'ai' || msg.role === 'error') ? charAvatarHTML : `<div class="w-8 h-8 flex-shrink-0"></div>`;
        const renderUserAvatar = (!isNextSame && msg.role === 'user') ? userAvatarHTML : `<div class="w-8 h-8 flex-shrink-0"></div>`;
        let aiRounding = "rounded-2xl"; if (isPrevSame) aiRounding += " rounded-tl-sm"; if (isNextSame) aiRounding += " rounded-bl-sm";
        let userRounding = "rounded-2xl"; if (isPrevSame) userRounding += " rounded-tr-sm"; if (isNextSame) userRounding += " rounded-br-sm";
        const mtClass = isPrevSame ? "mt-0.5" : "mt-4";

        if (msg.role === 'user') return `<div class="flex justify-end gap-2 w-full ${mtClass} items-end"><div class="bg-zinc-900 px-3.5 py-2 ${userRounding} shadow-sm max-w-[75%]"><p class="text-[14px] text-white font-medium break-words leading-snug whitespace-pre-wrap">${msg.text}</p></div>${renderUserAvatar}</div>`;
        else if (msg.role === 'error') return `<div class="flex justify-start gap-2 w-full mt-4 items-end">${renderAiAvatar}<div class="bg-red-50 px-3.5 py-2 rounded-2xl rounded-bl-sm shadow-sm border border-red-100 max-w-[75%]"><p class="text-[14px] text-red-600 font-medium break-words leading-snug whitespace-pre-wrap">${msg.text}</p></div></div>`;
        else return `<div class="flex justify-start gap-2 w-full ${mtClass} items-end">${renderAiAvatar}<div class="bg-white px-3.5 py-2 ${aiRounding} shadow-sm border border-zinc-100 max-w-[75%]"><p class="text-[14px] text-zinc-800 font-medium break-words leading-snug whitespace-pre-wrap">${msg.text}</p></div></div>`;
    }).join('');
    window.scrollToBottom();
};

window.scrollToBottom = function() { const container = document.getElementById('chat-messages'); container.scrollTop = container.scrollHeight; };
window.handleEnter = function(e) { if (e.key === 'Enter') window.sendMessage(); };

window.sendMessage = function() {
    const input = document.getElementById('chat-input'); const text = input.value.trim(); if(!text) return;
    if(!window.chatHistories[currentChatId]) window.chatHistories[currentChatId] = [];
    window.chatHistories[currentChatId].push({ role: 'user', text }); input.value = ''; 
    window.saveAllLingoData(); window.renderChatMessages();
};

window.receiveMessage = async function() {
    if(isReceiving || !currentChatId) return;
    isReceiving = true;

    const container = document.getElementById('chat-messages'); 
    const typingId = 'typing-' + Date.now();
    const char = window.characters.find(c => c.id === currentChatId);

    if(!window.chatHistories[currentChatId]) window.chatHistories[currentChatId] = [];
    const history = window.chatHistories[currentChatId];
    const charAvatar = char.avatarUrl ? `<img src="${char.avatarUrl}" class="w-8 h-8 rounded-full object-cover flex-shrink-0 shadow-sm" />` : `<div class="w-8 h-8 rounded-full bg-gradient-to-tr ${char.color} flex items-center justify-center text-white flex-shrink-0 shadow-sm text-xs font-bold">${char.name.charAt(0).toUpperCase()}</div>`;
    const isPrevSame = history.length > 0 && history[history.length - 1].role === 'ai';
    const mtClass = isPrevSame ? "mt-0.5" : "mt-4";
    
    container.insertAdjacentHTML('beforeend', `
    <div id="${typingId}" class="flex justify-start gap-2 w-full ${mtClass} items-end">
        ${charAvatar}
        <div class="bg-white px-3.5 py-2.5 rounded-2xl rounded-bl-sm shadow-sm border border-zinc-100 flex items-center gap-1 w-14 h-[32px]">
            <div class="w-1.5 h-1.5 bg-zinc-400 rounded-full typing-dot"></div><div class="w-1.5 h-1.5 bg-zinc-400 rounded-full typing-dot"></div><div class="w-1.5 h-1.5 bg-zinc-400 rounded-full typing-dot"></div>
        </div>
    </div>`);
    window.scrollToBottom();
    
    let apiUrl = window.safeGet('global_api_url') || "https://api.openai.com"; apiUrl = apiUrl.replace(/\/+$/, '');
    const apiKey = window.safeGet('global_api_key');
    const apiModel = window.safeGet('global_api_model') || "gpt-3.5-turbo";

    if (!apiKey) {
        setTimeout(() => {
            document.getElementById(typingId)?.remove();
            window.chatHistories[currentChatId].push({ role: 'error', text: "系统提示：请先在桌面的 API 软件中配置 Secret Key。" });
            window.saveAllLingoData(); window.renderChatMessages(); isReceiving = false;
        }, 800); return;
    }

    const systemPrompt = `你现在的身份是：${char.name}。你的性别是：${char.gender || '保密'}，年龄是：${char.age || '保密'}。
你的核心设定和要求如下：
${char.prompt}
【极其重要的回复规则，请绝对严格遵守】
1. 你是一个活生生的人，正在用手机发微信/短信和我聊天，绝对不要暴露你是AI或助手。
2. 绝对不要使用任何动作描述、神态描写、心理描写！
3. 正常人聊天绝对不会把很多话挤在一个长气泡里发出来！你必须拆分！
4. 如果你要说多句话，**必须**使用换行符（\\n）将句子隔开！系统会自动把每一行切分成单独的聊天气泡发送给用户！
5. 保持极度口语化、接地气！字数尽量精简，像真人发消息一样随性！`;

    const messagesPayload = [{ role: "system", content: systemPrompt }];
    const recentHistory = history.slice(-15);
    recentHistory.forEach(msg => {
        if(msg.role === 'user' || msg.role === 'ai') {
            messagesPayload.push({ role: msg.role === 'user' ? 'user' : 'assistant', content: msg.text });
        }
    });

    try {
        const response = await fetch(`${apiUrl}/v1/chat/completions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
            body: JSON.stringify({ model: apiModel, messages: messagesPayload, temperature: 0.85 })
        });

        document.getElementById(typingId)?.remove();

        if (!response.ok) {
            const errData = await response.json().catch(()=>({}));
            throw new Error(errData.error?.message || `网络请求失败 (状态码: ${response.status})`);
        }

        const data = await response.json();
        let aiReply = data.choices[0].message.content;
        aiReply = aiReply.replace(/\*.*?\*/g, '').replace(/（.*?）/g, '').replace(/\(.*?\)/g, '').replace(/【.*?】/g, '');
        const replies = aiReply.split('\n').map(s => s.trim()).filter(s => s.length > 0);

        for (let i = 0; i < replies.length; i++) {
            if (i > 0) {
                const nextTypingId = 'typing-' + Date.now();
                const chatBox = document.getElementById('chat-messages');
                chatBox.insertAdjacentHTML('beforeend', `
                <div id="${nextTypingId}" class="flex justify-start gap-2 w-full mt-0.5 items-end">
                    <div class="w-8 h-8 flex-shrink-0"></div>
                    <div class="bg-white px-3.5 py-2.5 rounded-2xl rounded-tl-sm rounded-bl-sm shadow-sm border border-zinc-100 flex items-center gap-1 w-14 h-[32px]">
                        <div class="w-1.5 h-1.5 bg-zinc-400 rounded-full typing-dot"></div><div class="w-1.5 h-1.5 bg-zinc-400 rounded-full typing-dot"></div><div class="w-1.5 h-1.5 bg-zinc-400 rounded-full typing-dot"></div>
                    </div>
                </div>`);
                window.scrollToBottom();
                const delay = Math.min(2000, 800 + replies[i].length * 30);
                await new Promise(r => setTimeout(r, delay));
                document.getElementById(nextTypingId)?.remove();
            }

            window.chatHistories[currentChatId].push({ role: 'ai', text: replies[i] });
            window.saveAllLingoData(); 
            window.renderChatMessages();
        }
    } catch (error) {
        document.getElementById(typingId)?.remove();
        window.chatHistories[currentChatId].push({ role: 'error', text: `API 调用失败：${error.message}` });
        window.saveAllLingoData(); window.renderChatMessages();
    } finally {
        isReceiving = false;
    }
};

// 立即初始化执行渲染
window.renderCharacters(); window.renderTopAvatars(); window.renderChatList();