// 动态注入 API 界面 HTML
const apiUI = `
<div id="screen-api" class="absolute inset-0 bg-[#fcfbf8] flex flex-col transition-transform duration-[400ms] ease-[cubic-bezier(0.32,0.72,0,1)] w-full h-full z-20 translate-x-full">
    <div class="px-6 pt-14 pb-4 flex items-center justify-between border-b border-black z-10 relative">
        <div onclick="window.closeApp('screen-api')" class="flex items-center gap-1 cursor-pointer text-zinc-400 hover:text-black transition-colors active:opacity-50 w-16">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="square" stroke-linejoin="miter" d="M15 19l-7-7 7-7" /></svg>
            <span class="text-xs font-bold mt-0.5 tracking-widest uppercase">Back</span>
        </div>
        <div onclick="window.saveGlobalAPI()" id="global-save-btn" class="w-16 text-right text-xs font-bold tracking-[0.2em] text-black cursor-pointer active:opacity-50 transition-all uppercase">Save</div>
    </div>
    <div class="flex-1 overflow-y-auto no-scrollbar p-8 flex flex-col pb-24">
        <div class="mb-10 mt-4">
            <h1 class="text-4xl font-extrabold text-black tracking-widest leading-none mb-2">API<br/>CONFIG.</h1>
            <p class="text-[9px] text-zinc-500 tracking-[0.3em] uppercase font-sans">Neural Network Bridging System</p>
        </div>
        <div class="border-t-2 border-black pt-6 pb-8 flex flex-col gap-6">
            <div class="relative">
                <label class="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.2em] block mb-1">Base URL / 代理地址</label>
                <input id="api-url" type="text" placeholder="https://api.openai.com" class="w-full bg-transparent border-b border-zinc-300 focus:border-black py-2 text-base text-black transition-colors placeholder-zinc-300 rounded-none outline-none" />
            </div>
            <div class="relative">
                <label class="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.2em] block mb-1">Secret Key / 密钥</label>
                <input id="api-key" type="password" placeholder="sk-..." class="w-full bg-transparent border-b border-zinc-300 focus:border-black py-2 text-base text-black transition-colors placeholder-zinc-300 rounded-none tracking-widest outline-none" />
            </div>
            <button type="button" onclick="window.fetchModels()" class="mt-2 w-full bg-black text-white py-4 text-[10px] font-bold tracking-[0.3em] uppercase active:bg-zinc-800 transition-colors flex items-center justify-center gap-2 rounded-none">Fetch Models / 拉取模型</button>
            <div id="fetch-status" class="text-center text-[10px] text-zinc-400 h-3 tracking-widest transition-colors italic">等待连接...</div>
        </div>
        <div class="border-t border-zinc-300 pt-6 pb-8">
            <div class="relative">
                <label class="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.2em] block mb-1">Select Model / 选择模型</label>
                <select id="model-select" class="w-full bg-transparent border-b border-zinc-300 focus:border-black py-2 text-base text-black transition-colors rounded-none cursor-pointer outline-none"><option value="">请先拉取或手动输入</option></select>
            </div>
        </div>
        <div class="border-t border-zinc-300 pt-6 flex flex-col gap-6">
            <div class="flex items-center justify-between"><h2 class="text-sm font-extrabold text-black tracking-widest">SAVED PRESETS.</h2></div>
            <button id="create-preset-btn" type="button" onclick="window.openPresetModal()" class="w-full bg-transparent border border-black text-black py-4 text-[10px] font-bold tracking-[0.2em] uppercase active:bg-zinc-100 transition-colors flex items-center justify-center gap-2 rounded-none">Save as Preset / 存为预设</button>
            <div id="presets-list" class="flex flex-col gap-0 mt-2 border-b border-zinc-200"></div>
        </div>
        <div class="flex items-center justify-between mt-12 pt-4 border-t border-black">
            <span class="text-[9px] font-bold text-zinc-400 tracking-[0.2em] uppercase">Current Status</span>
            <div class="flex items-center gap-2 text-[10px] text-zinc-600">
                <span id="global-status-dot" class="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
                <span id="global-status-text" class="tracking-widest">无生效配置</span>
            </div>
        </div>
    </div>
    <!-- API 保存弹窗 -->
    <div id="custom-modal" class="absolute inset-0 z-50 flex items-center justify-center bg-[#fcfbf8]/90 backdrop-blur-md opacity-0 pointer-events-none transition-opacity duration-300">
        <div id="custom-modal-card" class="bg-white p-8 w-[85%] max-w-[320px] shadow-[0_20px_40px_rgba(0,0,0,0.08)] transform scale-95 transition-transform duration-300 flex flex-col gap-6 border border-black mb-32 rounded-none">
            <div class="text-center border-b border-zinc-200 pb-4">
                <h3 class="text-lg font-extrabold text-black tracking-widest mb-1 uppercase">Name Preset</h3>
                <p class="text-[9px] text-zinc-500 tracking-[0.1em] uppercase">给预设起个名字吧</p>
            </div>
            <input id="preset-name-input" type="text" placeholder="e.g. GPT-4 Pro" class="w-full bg-transparent border-b border-black py-3 text-center text-base text-black outline-none placeholder-zinc-300 rounded-none tracking-widest" />
            <div class="flex flex-col gap-2 mt-2">
                <button type="button" ontouchstart="window.forceSave(event)" onmousedown="window.forceSave(event)" id="modal-save-btn" class="w-full py-4 bg-black text-white text-[10px] font-bold tracking-[0.3em] uppercase active:bg-zinc-800 transition-colors rounded-none">Confirm / 确认保存</button>
                <button type="button" onclick="window.closePresetModal()" class="w-full py-3 bg-transparent text-zinc-400 text-[10px] font-bold tracking-[0.2em] uppercase active:text-black transition-colors rounded-none">Cancel / 取消</button>
            </div>
        </div>
    </div>
</div>
`;

document.getElementById('app-container').insertAdjacentHTML('beforeend', apiUI);

// ==============================
// ⚙️ API 逻辑
// ==============================
const urlInput = document.getElementById('api-url'); 
const keyInput = document.getElementById('api-key'); 
const modelSelect = document.getElementById('model-select');
const statusText = document.getElementById('fetch-status'); 
const presetsList = document.getElementById('presets-list'); 
const saveBtn = document.getElementById('global-save-btn');
const modal = document.getElementById('custom-modal'); 
const modalCard = document.getElementById('custom-modal-card'); 
const nameInput = document.getElementById('preset-name-input');

nameInput.addEventListener('keypress', function (e) { if (e.key === 'Enter') { e.preventDefault(); window.confirmSavePreset(); } });

window.saveGlobalAPI = function() {
    const url = urlInput.value.trim() || 'https://api.openai.com', key = keyInput.value.trim(), model = modelSelect.value;
    if(!key || !model) { saveBtn.innerText = 'ERROR'; saveBtn.classList.add('text-red-500'); setTimeout(() => { saveBtn.innerText = 'SAVE'; saveBtn.classList.remove('text-red-500'); }, 1500); return; }
    window.safeSet('global_api_url', url); window.safeSet('global_api_key', key); window.safeSet('global_api_model', model);
    window.updateGlobalStatus(model);
    saveBtn.innerText = 'SAVED'; saveBtn.classList.add('text-green-600'); setTimeout(() => { saveBtn.innerText = 'SAVE'; saveBtn.classList.remove('text-green-600'); }, 1500);
};

window.updateGlobalStatus = function(modelName) {
    document.getElementById('global-status-text').innerText = modelName;
    document.getElementById('global-status-dot').classList.replace('bg-zinc-300', 'bg-black');
    document.getElementById('global-status-dot').classList.add('animate-pulse');
};

window.fetchModels = async function() {
    let url = urlInput.value.trim() || "https://api.openai.com"; url = url.replace(/\/+$/, ''); const key = keyInput.value.trim();
    if(!key) { window.showStatus('Missing Secret Key.', 'text-red-500'); return; }
    window.showStatus('Connecting...', 'text-zinc-400');
    try {
        const response = await fetch(`${url}/v1/models`, { method: 'GET', headers: { 'Authorization': `Bearer ${key}` } });
        if(!response.ok) throw new Error('Key无效');
        const data = await response.json(); modelSelect.innerHTML = '';
        if(data.data && data.data.length > 0) { data.data.forEach(m => { const opt = document.createElement('option'); opt.value = m.id; opt.textContent = m.id; modelSelect.appendChild(opt); }); window.showStatus(`${data.data.length} Models Fetched.`, 'text-black font-bold'); } 
        else throw new Error('无模型');
    } catch(err) {
        window.showStatus('Network blocked. Mock models loaded.', 'text-zinc-600');
        const mockModels = ['gpt-3.5-turbo', 'gpt-4', 'gpt-4o', 'claude-3-opus', 'gemini-1.5-pro', 'deepseek-chat'];
        modelSelect.innerHTML = ''; mockModels.forEach(m => { const opt = document.createElement('option'); opt.value = m; opt.textContent = m; modelSelect.appendChild(opt); });
    }
};

window.showStatus = function(t, c) { statusText.innerText = t; statusText.className = `text-center text-[10px] h-3 tracking-widest transition-colors italic ${c}`; };
window.getPresets = function() { return JSON.parse(window.safeGet('api_presets') || '[]'); };
window.openPresetModal = function() {
    const key = keyInput.value.trim(), model = modelSelect.value;
    if(!key || !model) { const b = document.getElementById('create-preset-btn'), o = b.innerHTML; b.innerHTML = `⚠️ MISSING PARAMETERS`; b.classList.add('text-red-500', 'border-red-500'); setTimeout(() => { b.innerHTML = o; b.classList.remove('text-red-500', 'border-red-500'); }, 2000); return; }
    nameInput.value = ''; modal.classList.remove('opacity-0', 'pointer-events-none'); modalCard.classList.remove('scale-95'); modalCard.classList.add('scale-100'); setTimeout(() => nameInput.focus(), 100);
};
window.closePresetModal = function() { nameInput.blur(); modal.classList.add('opacity-0', 'pointer-events-none'); modalCard.classList.remove('scale-100'); modalCard.classList.add('scale-95'); };
window.forceSave = function(e) { if(e) e.preventDefault(); window.confirmSavePreset(); };

window.confirmSavePreset = function() {
    const presetName = nameInput.value.trim(); if(!presetName) { nameInput.classList.add('border-red-500', 'placeholder-red-300'); setTimeout(() => nameInput.classList.remove('border-red-500', 'placeholder-red-300'), 1000); return; }
    const btn = document.getElementById('modal-save-btn'); btn.innerText = 'SAVING...';
    setTimeout(() => {
        const url = urlInput.value.trim() || 'https://api.openai.com', key = keyInput.value.trim(), model = modelSelect.value;
        const newPreset = { id: Date.now().toString(), name: presetName, url: url, key: key, model: model };
        const presets = window.getPresets(); presets.push(newPreset); window.safeSet('api_presets', JSON.stringify(presets));
        window.renderPresets(); window.closePresetModal(); btn.innerText = 'Confirm / 确认保存';
    }, 50);
};

window.loadPreset = function(id) { const presets = window.getPresets(), target = presets.find(p => p.id === id); if(target) { urlInput.value = target.url; keyInput.value = target.key; modelSelect.innerHTML = `<option value="${target.model}">${target.model}</option>`; window.showStatus('Preset loaded. Click SAVE above.', 'text-black font-bold'); } };
window.deletePreset = function(e, id) { e.stopPropagation(); let presets = window.getPresets(); presets = presets.filter(p => p.id !== id); window.safeSet('api_presets', JSON.stringify(presets)); window.renderPresets(); };

window.renderPresets = function() {
    const presets = window.getPresets(); presetsList.innerHTML = ''; 
    if(presets.length === 0) { presetsList.innerHTML = '<div class="text-[10px] text-zinc-400 text-center py-6 tracking-widest uppercase italic">Empty Presets.</div>'; return; }
    presets.forEach((p, i) => {
        const card = document.createElement('div'); card.className = "flex items-center justify-between py-4 cursor-pointer hover:bg-zinc-100 transition-colors active:opacity-50 border-t border-zinc-200 group"; card.onclick = () => window.loadPreset(p.id);
        card.innerHTML = `<div class="flex flex-col gap-1 overflow-hidden"><span class="text-sm font-bold text-black truncate tracking-wider uppercase">0${i+1}. ${p.name}</span><span class="text-[10px] text-zinc-500 font-sans truncate">${p.model}</span></div><div onclick="window.deletePreset(event, '${p.id}')" class="p-2 text-zinc-300 hover:text-black transition-colors"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="square" stroke-linejoin="miter" d="M6 18L18 6M6 6l12 12" /></svg></div>`;
        presetsList.appendChild(card);
    });
};

// 立即初始化读取API缓存
const gUrl = window.safeGet('global_api_url'), gKey = window.safeGet('global_api_key'), gMod = window.safeGet('global_api_model');
if(gUrl) urlInput.value = gUrl; if(gKey) keyInput.value = gKey;
if(gMod) { modelSelect.innerHTML = `<option value="${gMod}">${gMod}</option>`; window.updateGlobalStatus(gMod); }
window.renderPresets();
