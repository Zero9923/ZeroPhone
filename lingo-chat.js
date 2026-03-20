const chatRoomUI = `
    <div id="page-chat-room" class="absolute inset-0 z-[70] bg-[#F2F2F7] translate-x-full transition-transform duration-300 flex flex-col overflow-hidden">
        <div class="pt-12 pb-3 px-4 flex items-center justify-between bg-white/90 backdrop-blur-md border-b border-zinc-200 z-20 shadow-sm relative">
            <button onclick="window.closeChatRoom()" class="flex items-center text-zinc-900 active:opacity-50">
                <svg class="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
                <span class="font-medium text-[15px]">Back</span>
            </button>
            <div class="flex flex-col items-center justify-center absolute left-1/2 -translate-x-1/2">
                <span id="chat-room-name" class="font-semibold text-[15px] text-zinc-900">Name</span>
            </div>
            <button onclick="console.log('Open Settings')" class="w-8 h-8 flex items-center justify-end text-zinc-900 active:opacity-50">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
            </button>
        </div>
        
        <div class="flex-1 overflow-y-auto p-4 flex flex-col gap-1 pb-6 transition-all duration-300" id="chat-messages" onmousedown="window.hideChatMenu(); document.getElementById('chat-input').blur()" ontouchstart="window.hideChatMenu(); document.getElementById('chat-input').blur()"></div>
        
        <div id="quote-preview" class="hidden px-4 py-2 bg-zinc-50 border-t border-zinc-200 flex items-center justify-between text-[11px] text-zinc-500 font-medium z-10">
            <div class="flex items-center gap-2 truncate">
                <svg class="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"/></svg>
                <span id="quote-text" class="truncate"></span>
            </div>
            <button onclick="window.clearQuote()" class="text-zinc-400 p-1 active:bg-zinc-200 rounded-full">✕</button>
        </div>

        <div class="bg-white border-t border-zinc-100 flex flex-col z-20 transition-transform duration-300 transform" id="chat-bottom-area">
            <div id="chat-input-bar" class="px-3 py-3 pb-8 flex items-end gap-2 bg-white z-20 relative">
                <button onclick="window.toggleChatMenu()" class="w-10 h-10 min-w-[40px] bg-zinc-100 rounded-full flex items-center justify-center text-zinc-900 active:scale-90 transition-transform flex-shrink-0">
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                </button>
                <div class="flex-1 bg-zinc-100 rounded-2xl pl-4 pr-1 py-1.5 min-h-[40px] flex items-center w-full">
                    <input id="chat-input" type="text" placeholder="Message..." class="w-full bg-transparent border-none text-[13px] outline-none font-medium text-zinc-900 py-1" onkeypress="window.handleEnter(event)" onfocus="window.hideChatMenu()" />
                    <button class="text-zinc-400 p-1.5 active:scale-90 transition-transform flex-shrink-0" onclick="alert('表情包功能即将上线！')"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></button>
                </div>
                <button onclick="window.receiveMessage()" class="w-10 h-10 min-w-[40px] bg-zinc-100 rounded-full flex items-center justify-center text-zinc-900 active:scale-90 transition-transform flex-shrink-0">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" /></svg>
                </button>
                <button onclick="window.sendMessage()" class="w-10 h-10 min-w-[40px] bg-zinc-900 rounded-full flex items-center justify-center text-white active:scale-90 transition-transform flex-shrink-0 shadow-sm">
                    <svg class="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                </button>
            </div>
            
            <div id="chat-feature-menu" class="max-h-0 overflow-hidden bg-[#F2F2F7] transition-all duration-300 border-t border-zinc-200">
                <div class="px-6 py-6 pb-12 grid grid-cols-4 gap-y-6 gap-x-4 place-items-start">
                    <button type="button" onclick="window.regenerateReply()" class="flex flex-col items-center gap-2 active:scale-95 transition-transform w-full outline-none">
                        <div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-zinc-800 pointer-events-none"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg></div><span class="text-[10px] font-semibold text-zinc-500 pointer-events-none">重回</span>
                    </button>
                    <button type="button" onclick="window.openTransferModal()" class="flex flex-col items-center gap-2 active:scale-95 transition-transform w-full outline-none">
                        <div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-[#F59A23] pointer-events-none"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg></div><span class="text-[10px] font-semibold text-zinc-500 pointer-events-none">转账</span>
                    </button>
                    <button type="button" onclick="window.openRedPacketModal()" class="flex flex-col items-center gap-2 active:scale-95 transition-transform w-full outline-none">
                        <div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-[#F45447] pointer-events-none"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></div><span class="text-[10px] font-semibold text-zinc-500 pointer-events-none">红包</span>
                    </button>
                </div>
            </div>
        </div>

        <div id="multi-select-bar" class="hidden absolute bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-zinc-200 px-6 py-4 pb-10 flex items-center justify-between z-30 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
            <button onclick="window.endMultiSelect()" class="text-[13px] font-bold text-zinc-500">Cancel</button>
            <div class="flex items-center gap-6">
                <button onclick="window.multiAction('fav')" class="text-[13px] font-bold text-zinc-900 flex flex-col items-center"><svg class="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>Fav</button>
                <button onclick="window.openForwardModal()" class="text-[13px] font-bold text-zinc-900 flex flex-col items-center"><svg class="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>Forward</button>
                <button onclick="window.multiAction('del')" class="text-[13px] font-bold text-red-500 flex flex-col items-center"><svg class="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>Delete</button>
            </div>
        </div>
    </div>

    <!-- 转账模态框 (发起) -->
    <div id="transfer-modal" class="hidden absolute inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
        <div class="bg-[#F59A23] rounded-3xl w-full max-w-[300px] p-6 shadow-2xl flex flex-col gap-4 text-white">
            <h3 class="text-base font-bold text-center border-b border-white/20 pb-3">发起转账</h3>
            <div class="flex items-center text-3xl font-bold border-b border-white/40 py-2"><span class="mr-2 text-2xl">¥</span><input id="transfer-amount" type="number" placeholder="0.00" class="bg-transparent w-full outline-none placeholder-white/50 text-white" /></div>
            <input id="transfer-memo" type="text" placeholder="转账给对方" value="转账" class="bg-white/10 rounded-xl px-4 py-3 text-[13px] outline-none placeholder-white/50 text-white w-full" />
            <div class="flex gap-3 mt-2">
                <button onclick="document.getElementById('transfer-modal').classList.add('hidden')" class="flex-1 py-3 bg-white/20 rounded-xl text-[13px] font-bold">取消</button>
                <button onclick="window.sendTransfer()" class="flex-1 py-3 bg-white text-[#F59A23] rounded-xl text-[13px] font-bold shadow-md">发送</button>
            </div>
        </div>
    </div>

    <!-- 红包模态框 (发起) -->
    <div id="redpacket-modal" class="hidden absolute inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
        <div class="bg-[#F45447] rounded-3xl w-full max-w-[300px] p-6 shadow-2xl flex flex-col gap-4 text-[#FDE0A6]">
            <h3 class="text-base font-bold text-center border-b border-[#FDE0A6]/20 pb-3">发红包</h3>
            <div class="flex items-center text-3xl font-bold border-b border-[#FDE0A6]/40 py-2"><span class="mr-2 text-2xl">¥</span><input id="redpacket-amount" type="number" placeholder="0.00" class="bg-transparent w-full outline-none placeholder-[#FDE0A6]/50 text-[#FDE0A6]" /></div>
            <input id="redpacket-memo" type="text" placeholder="恭喜发财，大吉大利" value="恭喜发财，大吉大利" class="bg-[#D93F34] rounded-xl px-4 py-3 text-[13px] outline-none placeholder-[#FDE0A6]/50 text-[#FDE0A6] w-full" />
            <div class="flex gap-3 mt-2">
                <button onclick="document.getElementById('redpacket-modal').classList.add('hidden')" class="flex-1 py-3 bg-[#D93F34] rounded-xl text-[13px] font-bold">取消</button>
                <button onclick="window.sendRedPacket()" class="flex-1 py-3 bg-[#FDE0A6] text-[#F45447] rounded-xl text-[13px] font-bold shadow-md">塞钱进红包</button>
            </div>
        </div>
    </div>

    <!-- 用户点对方转账时的弹窗 -->
    <div id="transfer-receive-modal" class="hidden absolute inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6" onclick="window.closeTransferReceiveModal()">
        <div class="bg-white rounded-3xl w-full max-w-[280px] p-6 shadow-2xl flex flex-col gap-5 text-zinc-900" onclick="event.stopPropagation()">
            <div class="flex flex-col items-center gap-2 border-b border-zinc-100 pb-4">
                <div class="w-12 h-12 rounded-full bg-[#F59A23] text-white flex items-center justify-center shadow-sm"><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-3.57-1.62-3.57-3.15 0-1.53 1.11-2.61 2.5-2.93V4.9h2.67v1.91c1.38.23 2.49 1.08 2.65 2.74h-1.96c-.08-.85-.66-1.54-2.02-1.54-1.25 0-2.08.63-2.08 1.47 0 .61.32 1.34 2.56 1.92 2.82.72 3.78 1.88 3.78 3.33 0 1.63-1.16 2.83-2.9 3.36z"/></svg></div>
                <span class="text-sm font-bold text-zinc-500">对方发来的转账</span>
                <span class="text-3xl font-extrabold" id="transfer-receive-amount">¥ 0.00</span>
            </div>
            <div class="flex gap-3">
                <button onclick="window.refundTransfer()" class="flex-1 py-3 bg-zinc-100 text-zinc-600 rounded-xl text-[13px] font-bold active:scale-95 transition-transform">退还</button>
                <button onclick="window.acceptTransfer()" class="flex-1 py-3 bg-[#F59A23] text-white rounded-xl text-[13px] font-bold shadow-md active:scale-95 transition-transform">确认收款</button>
            </div>
        </div>
    </div>

    <!-- 用户点对方红包的【开】弹窗 -->
    <div id="redpacket-receive-modal" class="hidden absolute inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6" onclick="window.closeRedpacketReceiveModal()">
        <div class="bg-[#D93F34] rounded-2xl w-full max-w-[260px] h-[340px] shadow-2xl flex flex-col items-center relative overflow-hidden" onclick="event.stopPropagation()">
            <div class="absolute top-0 left-0 w-full h-[30%] bg-[#F45447] rounded-b-[50%]"></div>
            <div class="z-10 mt-10 flex flex-col items-center gap-2">
                <div class="w-12 h-12 rounded-full border-2 border-[#FDE0A6] overflow-hidden shadow-sm" id="redpacket-receive-avatar"></div>
                <span class="text-[#FDE0A6] font-bold text-sm" id="redpacket-receive-name">Name</span>
                <span class="text-[#FDE0A6]/80 text-xs mt-2" id="redpacket-receive-memo">发了一个红包，金额随机</span>
            </div>
            <button onclick="window.acceptRedpacket()" class="z-10 mt-auto mb-10 w-20 h-20 bg-[#FDE0A6] rounded-full flex items-center justify-center text-[#D93F34] text-3xl font-bold shadow-[0_4px_15px_rgba(0,0,0,0.2)] active:scale-90 transition-transform tracking-widest">開</button>
        </div>
    </div>

    <!-- 红包详情页(显示金额) -->
    <div id="redpacket-detail-modal" class="hidden absolute inset-0 z-[110] bg-[#F2F2F7] flex flex-col transition-transform duration-300 translate-y-full">
        <div class="relative w-full h-[150px] bg-[#D93F34] rounded-b-[15%] flex flex-col items-center pt-12 px-4 shadow-sm z-10">
            <button onclick="window.closeRedpacketDetail()" class="absolute top-12 left-4 text-[#FDE0A6] active:scale-90 transition-transform"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg></button>
            <span class="text-[#FDE0A6] font-bold text-[15px] tracking-widest absolute top-12">红包</span>
            <div class="w-16 h-16 rounded-xl border-[3px] border-white overflow-hidden shadow-md absolute -bottom-8 bg-white" id="redpacket-detail-avatar"></div>
        </div>
        <div class="mt-12 flex flex-col items-center px-6 z-0">
            <span class="text-[16px] font-bold text-zinc-900 flex items-center gap-1" id="redpacket-detail-name">Name <span class="text-xs bg-red-100 text-red-500 px-1 rounded">拼</span></span>
            <span class="text-[12px] text-zinc-400 mt-1 font-medium" id="redpacket-detail-memo">恭喜发财，大吉大利</span>
            <div class="mt-8 flex items-baseline text-[#D93F34]"><span class="text-5xl font-bold tracking-tight" id="redpacket-detail-amount">0.00</span><span class="text-sm font-bold ml-1 mb-1">元</span></div>
            <span class="text-[11px] text-blue-500 font-bold mt-6 cursor-pointer">已存入零钱，可直接消费 ></span>
        </div>
    </div>

    <!-- 长按菜单 / 编辑 / 转发 / 查看转发记录 -->
    <div id="msg-context-modal" class="hidden absolute inset-0 z-[80] bg-black/40 backdrop-blur-sm flex flex-col justify-end transition-opacity" onclick="window.closeMsgMenu(event)">
        <div id="msg-context-card" class="bg-white rounded-t-3xl pb-10 pt-4 px-4 transform translate-y-full transition-transform duration-300 flex flex-col gap-1 shadow-2xl" onclick="event.stopPropagation()">
            <div class="w-12 h-1.5 bg-zinc-200 rounded-full mx-auto mb-4"></div>
            <button onclick="window.msgAction('copy')" class="w-full text-left px-5 py-4 text-[14px] font-semibold text-zinc-900 active:bg-zinc-100 rounded-2xl flex items-center justify-between border-b border-zinc-50">Copy <span class="text-xs text-zinc-400">复制</span></button>
            <button onclick="window.msgAction('quote')" class="w-full text-left px-5 py-4 text-[14px] font-semibold text-zinc-900 active:bg-zinc-100 rounded-2xl flex items-center justify-between border-b border-zinc-50">Reply <span class="text-xs text-zinc-400">引用</span></button>
            <button onclick="window.msgAction('edit')" class="w-full text-left px-5 py-4 text-[14px] font-semibold text-zinc-900 active:bg-zinc-100 rounded-2xl flex items-center justify-between border-b border-zinc-50">Edit <span class="text-xs text-zinc-400">编辑</span></button>
            <button onclick="window.msgAction('revoke')" class="w-full text-left px-5 py-4 text-[14px] font-semibold text-zinc-900 active:bg-zinc-100 rounded-2xl flex items-center justify-between border-b border-zinc-50">Recall <span class="text-xs text-zinc-400">撤回</span></button>
            <button onclick="window.msgAction('select')" class="w-full text-left px-5 py-4 text-[14px] font-semibold text-zinc-900 active:bg-zinc-100 rounded-2xl flex items-center justify-between border-b border-zinc-50">Select <span class="text-xs text-zinc-400">多选</span></button>
            <button onclick="window.msgAction('del')" class="w-full text-left px-5 py-4 text-[14px] font-semibold text-red-500 active:bg-red-50 rounded-2xl flex items-center justify-between">Delete <span class="text-xs text-red-300">删除</span></button>
        </div>
    </div>

    <div id="msg-edit-modal" class="hidden absolute inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-6">
        <div class="bg-white rounded-3xl w-full max-w-[320px] p-5 shadow-2xl flex flex-col gap-4">
            <h3 class="text-sm font-bold text-zinc-900 text-center">Edit Message</h3>
            <textarea id="edit-msg-input" class="w-full bg-zinc-50 border border-zinc-200 p-4 text-[13px] rounded-2xl min-h-[120px] outline-none resize-none font-medium"></textarea>
            <div class="flex gap-3"><button onclick="document.getElementById('msg-edit-modal').classList.add('hidden')" class="flex-1 py-3 bg-zinc-100 text-zinc-600 rounded-xl text-[13px] font-bold">Cancel</button><button onclick="window.saveMsgEdit()" class="flex-1 py-3 bg-black text-white rounded-xl text-[13px] font-bold shadow-md">Save</button></div>
        </div>
    </div>

    <div id="forward-modal" class="hidden absolute inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-end justify-center" onclick="document.getElementById('forward-modal').classList.add('hidden')">
        <div class="bg-white w-full rounded-t-3xl p-5 pb-10 max-h-[70%] overflow-y-auto" onclick="event.stopPropagation()"><h3 class="text-[15px] font-bold text-zinc-900 text-center mb-4">Forward To...</h3><div id="forward-char-list" class="flex flex-col gap-2"></div></div>
    </div>

    <div id="forward-view-modal" class="hidden absolute inset-0 z-[100] bg-[#F2F2F7] flex flex-col transition-transform duration-300 translate-y-full">
        <div class="pt-12 pb-3 px-4 flex items-center justify-between bg-white/90 backdrop-blur-md border-b border-zinc-200 z-10 shadow-sm relative">
            <button onclick="document.getElementById('forward-view-modal').classList.add('translate-y-full'); setTimeout(()=>document.getElementById('forward-view-modal').classList.add('hidden'), 300);" class="flex items-center text-zinc-900 active:opacity-50"><svg class="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg><span class="font-medium text-[15px]">Back</span></button>
            <div class="flex flex-col items-center justify-center absolute left-1/2 -translate-x-1/2"><span class="font-semibold text-[15px] text-zinc-900">Chat History</span></div><div class="w-12"></div>
        </div>
        <div class="flex-1 overflow-y-auto p-4 flex flex-col gap-3 pb-10" id="forward-view-content"></div>
    </div>
</div>
`;
document.getElementById('screen-chat').insertAdjacentHTML('beforeend', chatRoomUI);

// 全局变量
window.activeMsgId = null; window.isMultiSelecting = false; window.selectedMsgIds = []; window.pendingQuoteText = null; window.isMenuOpen = false; window.pendingActionMsgId = null;
let msgPressTimer = null; let isPressingMsg = false;

window.generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 5);

window.toggleChatMenu = function() {
    window.isMenuOpen = !window.isMenuOpen;
    const menu = document.getElementById('chat-feature-menu');
    if(window.isMenuOpen) { menu.classList.remove('max-h-0'); menu.classList.add('max-h-[200px]'); } 
    else { menu.classList.add('max-h-0'); menu.classList.remove('max-h-[200px]'); }
};

window.hideChatMenu = function() {
    window.isMenuOpen = false;
    const menu = document.getElementById('chat-feature-menu');
    if(menu) { menu.classList.add('max-h-0'); menu.classList.remove('max-h-[200px]'); }
};

window.openChatRoom = function(charId) { 
    window.currentChatId = charId; window.isReceiving = false; 
    const char = window.characters.find(c => c.id === charId); 
    document.getElementById('chat-room-name').innerText = char.name; 
    document.getElementById('page-chat-room').classList.remove('translate-x-full'); 
    window.endMultiSelect(); window.clearQuote(); window.hideChatMenu(); window.renderChatMessages(); 
};

window.closeChatRoom = function() { 
    document.getElementById('page-chat-room').classList.add('translate-x-full'); window.hideChatMenu();
    if (!window.chats.find(c => c.id === window.currentChatId)) { window.chats.push(window.characters.find(c => c.id === window.currentChatId)); window.saveAllLingoData(); } 
    window.renderChatList(); 
};

// 🌟 严格限制的重回功能：只处理 AI 结尾
window.regenerateReply = function() {
    window.hideChatMenu();
    if(!window.currentChatId) return;
    const history = window.chatHistories[window.currentChatId];
    if(!history || history.length === 0) return;
    
    let lastMsg = history[history.length - 1];
    if(lastMsg.role !== 'ai') { alert("最后一条必须是对方的消息才能重回哦！"); return; }
    
    while(history.length > 0 && history[history.length - 1].role === 'ai') { history.pop(); }
    
    window.saveAllLingoData(); window.renderChatMessages(); 
    setTimeout(() => { window.receiveMessage(); }, 50); 
};

window.openTransferModal = function() { window.hideChatMenu(); document.getElementById('transfer-amount').value = ''; document.getElementById('transfer-modal').classList.remove('hidden'); };
window.openRedPacketModal = function() { window.hideChatMenu(); document.getElementById('redpacket-amount').value = ''; document.getElementById('redpacket-modal').classList.remove('hidden'); };

window.sendTransfer = function() {
    const amount = document.getElementById('transfer-amount').value;
    const memo = document.getElementById('transfer-memo').value || '转账';
    if(!amount || amount <= 0) return alert("请输入正确金额");
    if(!window.chatHistories[window.currentChatId]) window.chatHistories[window.currentChatId] = [];
    window.chatHistories[window.currentChatId].push({ id: window.generateId(), role: 'user', type: 'transfer', amount: amount, text: memo, isReceived: false, isRefunded: false });
    window.saveAllLingoData(); window.renderChatMessages(); document.getElementById('transfer-modal').classList.add('hidden');
};

window.sendRedPacket = function() {
    const amount = document.getElementById('redpacket-amount').value;
    const memo = document.getElementById('redpacket-memo').value || '恭喜发财，大吉大利';
    if(!amount || amount <= 0) return alert("请输入正确金额");
    if(!window.chatHistories[window.currentChatId]) window.chatHistories[window.currentChatId] = [];
    window.chatHistories[window.currentChatId].push({ id: window.generateId(), role: 'user', type: 'redpacket', amount: amount, text: memo, isReceived: false });
    window.saveAllLingoData(); window.renderChatMessages(); document.getElementById('redpacket-modal').classList.add('hidden');
};

window.handleCardClick = function(msgId) {
    const history = window.chatHistories[window.currentChatId];
    const msg = history.find(m => m.id === msgId);
    if(!msg) return; 
    
    if(msg.role === 'user') { alert("这是你发出的卡片，等待对方处理哦~"); return; }
    
    window.pendingActionMsgId = msg.id;

    if (msg.type === 'transfer') {
        if(msg.isReceived || msg.isRefunded) return;
        document.getElementById('transfer-receive-amount').innerText = `¥ ${msg.amount}`;
        document.getElementById('transfer-receive-modal').classList.remove('hidden');
    } else if (msg.type === 'redpacket') {
        const char = window.characters.find(c => c.id === window.currentChatId);
        if (msg.isReceived) {
            const avatarEl = document.getElementById('redpacket-detail-avatar');
            avatarEl.innerHTML = char.avatarUrl ? `<img src="${char.avatarUrl}" class="w-full h-full object-cover"/>` : `<div class="w-full h-full bg-gradient-to-tr ${char.color} flex items-center justify-center text-white font-bold text-xl">${char.name.charAt(0).toUpperCase()}</div>`;
            document.getElementById('redpacket-detail-name').innerHTML = `${char.name} 的红包`;
            document.getElementById('redpacket-detail-memo').innerText = msg.text;
            document.getElementById('redpacket-detail-amount').innerText = parseFloat(msg.amount).toFixed(2);
            
            const detailModal = document.getElementById('redpacket-detail-modal');
            detailModal.classList.remove('hidden'); setTimeout(()=> detailModal.classList.remove('translate-y-full'), 10);
        } else {
            const avatarEl = document.getElementById('redpacket-receive-avatar');
            avatarEl.innerHTML = char.avatarUrl ? `<img src="${char.avatarUrl}" class="w-full h-full object-cover"/>` : `<div class="w-full h-full bg-gradient-to-tr ${char.color} flex items-center justify-center text-white font-bold text-lg">${char.name.charAt(0).toUpperCase()}</div>`;
            document.getElementById('redpacket-receive-name').innerText = char.name;
            document.getElementById('redpacket-receive-memo').innerText = msg.text;
            document.getElementById('redpacket-receive-modal').classList.remove('hidden');
        }
    }
};

window.closeTransferReceiveModal = function() { document.getElementById('transfer-receive-modal').classList.add('hidden'); window.pendingActionMsgId = null; };
window.closeRedpacketReceiveModal = function() { document.getElementById('redpacket-receive-modal').classList.add('hidden'); window.pendingActionMsgId = null; };
window.closeRedpacketDetail = function() { const dm = document.getElementById('redpacket-detail-modal'); dm.classList.add('translate-y-full'); setTimeout(()=> dm.classList.add('hidden'), 300); window.pendingActionMsgId = null; };

window.acceptTransfer = function() {
    const history = window.chatHistories[window.currentChatId];
    const msg = history.find(m => m.id === window.pendingActionMsgId);
    if(msg) {
        msg.isReceived = true;
        history.push({ id: window.generateId(), role: 'user', type: 'transfer_received', amount: msg.amount, text: "已收款" });
        window.saveAllLingoData(); window.renderChatMessages();
    }
    window.closeTransferReceiveModal();
};

window.refundTransfer = function() {
    const history = window.chatHistories[window.currentChatId];
    const msg = history.find(m => m.id === window.pendingActionMsgId);
    if(msg) {
        msg.isRefunded = true;
        history.push({ id: window.generateId(), role: 'user', type: 'transfer_refunded', amount: msg.amount, text: "已退还" });
        window.saveAllLingoData(); window.renderChatMessages();
    }
    window.closeTransferReceiveModal();
};

window.acceptRedpacket = function() {
    const history = window.chatHistories[window.currentChatId];
    const msg = history.find(m => m.id === window.pendingActionMsgId);
    if(msg) {
        msg.isReceived = true;
        history.push({ id: window.generateId(), role: 'system', text: `你领取了对方的红包` });
        window.saveAllLingoData(); window.renderChatMessages();
        document.getElementById('redpacket-receive-modal').classList.add('hidden');
        
        const char = window.characters.find(c => c.id === window.currentChatId);
        const avatarEl = document.getElementById('redpacket-detail-avatar');
        avatarEl.innerHTML = char.avatarUrl ? `<img src="${char.avatarUrl}" class="w-full h-full object-cover"/>` : `<div class="w-full h-full bg-gradient-to-tr ${char.color} flex items-center justify-center text-white font-bold text-xl">${char.name.charAt(0).toUpperCase()}</div>`;
        document.getElementById('redpacket-detail-name').innerHTML = `${char.name} 的红包`;
        document.getElementById('redpacket-detail-memo').innerText = msg.text;
        document.getElementById('redpacket-detail-amount').innerText = parseFloat(msg.amount).toFixed(2);
        const dm = document.getElementById('redpacket-detail-modal'); dm.classList.remove('hidden'); setTimeout(()=> dm.classList.remove('translate-y-full'), 10);
    }
};

window.renderChatMessages = function() {
    const container = document.getElementById('chat-messages'); 
    const history = window.chatHistories[window.currentChatId] || [];
    const char = window.characters.find(c => c.id === window.currentChatId);
    if (!char) return;

    if (window.isMultiSelecting) { container.classList.remove('pb-6'); container.classList.add('pb-28'); } 
    else { container.classList.add('pb-6'); container.classList.remove('pb-28'); }

    history.forEach(m => { if(!m.id) m.id = window.generateId(); });

    const charAvatarHTML = char.avatarUrl ? `<img src="${char.avatarUrl}" class="w-8 h-8 rounded-full object-cover flex-shrink-0 shadow-sm" />` : `<div class="w-8 h-8 rounded-full bg-gradient-to-tr ${char.color} flex items-center justify-center text-white flex-shrink-0 shadow-sm text-xs font-bold">${char.name.charAt(0).toUpperCase()}</div>`;
    const userAvatarHTML = `<div class="w-8 h-8 rounded-full bg-zinc-200 border border-zinc-300 flex items-center justify-center text-zinc-500 flex-shrink-0 shadow-sm"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></div>`;

    container.innerHTML = history.map((msg, idx) => {
        const isSelected = window.selectedMsgIds.includes(msg.id);
        const checkboxHtml = window.isMultiSelecting ? `<div class="w-5 h-5 rounded-full border border-zinc-300 flex items-center justify-center flex-shrink-0 transition-colors ${isSelected?'bg-zinc-900 border-zinc-900 text-white':''}"><svg class="w-3 h-3 opacity-${isSelected?'100':'0'} transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg></div>` : '';
        const selectWrapClass = window.isMultiSelecting ? "cursor-pointer active:opacity-70 flex items-center gap-3 w-full" : "w-full";
        const pressEvents = `onmousedown="window.startMsgPress(event, '${msg.id}')" onmouseup="window.cancelMsgPress()" onmouseleave="window.cancelMsgPress()" ontouchstart="window.startMsgPress(event, '${msg.id}')" ontouchend="window.cancelMsgPress()" ontouchmove="window.cancelMsgPress()" onclick="window.handleMsgClick('${msg.id}')" style="-webkit-touch-callout: none; user-select: none;"`;

        if (msg.role === 'system' || msg.isRevoked) {
            const sysText = msg.isRevoked ? `"${msg.role==='user'?'你':char.name}" 撤回了一条消息` : msg.text;
            return `<div class="${selectWrapClass} flex justify-center mt-4 mb-2" ${pressEvents}>${checkboxHtml}<div class="flex-1 flex justify-center"><span onclick="!window.isMultiSelecting && ${msg.isRevoked ? `alert('撤回的原始内容:\\n${msg.originalText}')` : ''}" class="text-[11px] text-zinc-400 bg-zinc-200/50 px-3 py-1.5 rounded-full ${msg.isRevoked?'cursor-pointer active:scale-95 transition-transform':''} font-medium">${sysText}</span></div></div>`;
        }

        const isNextSame = idx < history.length - 1 && history[idx + 1].role === msg.role && !history[idx + 1].isRevoked && history[idx + 1].role !== 'system';
        const isPrevSame = idx > 0 && history[idx - 1].role === msg.role && !history[idx - 1].isRevoked && history[idx - 1].role !== 'system';
        const renderAiAvatar = (!isNextSame && msg.role === 'ai' || msg.role === 'error') ? charAvatarHTML : `<div class="w-8 h-8 flex-shrink-0"></div>`;
        const renderUserAvatar = (!isNextSame && msg.role === 'user') ? userAvatarHTML : `<div class="w-8 h-8 flex-shrink-0"></div>`;
        let aiRounding = "rounded-2xl"; if (isPrevSame) aiRounding += " rounded-tl-sm"; if (isNextSame) aiRounding += " rounded-bl-sm";
        let userRounding = "rounded-2xl"; if (isPrevSame) userRounding += " rounded-tr-sm"; if (isNextSame) userRounding += " rounded-br-sm";
        const mtClass = isPrevSame ? "mt-0.5" : "mt-4";
        const quoteHtmlAi = msg.quote ? `<div class="text-[10px] text-zinc-400 bg-black/5 px-2.5 py-1.5 rounded-lg mt-1 ml-1 self-start border-l-2 border-zinc-300 max-w-full line-clamp-2 shadow-sm font-medium">引用: ${msg.quote}</div>` : '';
        const quoteHtmlUser = msg.quote ? `<div class="text-[10px] text-zinc-400 bg-black/5 px-2.5 py-1.5 rounded-lg mt-1 mr-1 self-end border-r-2 border-zinc-300 max-w-full line-clamp-2 shadow-sm font-medium text-right">引用: ${msg.quote}</div>` : '';

        let bubbleHtml = '';
        if (msg.isForwardCard) {
            const cardDataStr = encodeURIComponent(JSON.stringify(msg.forwardData));
            bubbleHtml = `<div onclick="!window.isMultiSelecting && window.openForwardView('${cardDataStr}')" class="bg-white border border-zinc-200 rounded-2xl p-3 shadow-sm w-[220px] cursor-pointer active:scale-95 transition-transform"><div class="text-[13px] font-bold text-zinc-900 border-b border-zinc-100 pb-2 mb-2">Chat History</div><div class="text-[11px] text-zinc-500 line-clamp-3 leading-snug">${msg.forwardPreviewText}</div></div>`;
        } else if (msg.type === 'transfer') {
            let statusText = '微信转账'; let bgClass = 'bg-[#F59A23]'; let iconColor = 'text-white';
            if (msg.isRefunded) { statusText = '已退还'; bgClass = 'bg-[#F59A23]/60'; iconColor = 'text-white/70'; }
            else if (msg.isReceived) { statusText = '已收款'; bgClass = 'bg-[#F59A23]/60'; iconColor = 'text-white/70'; }
            bubbleHtml = `<div onclick="!window.isMultiSelecting && window.handleCardClick('${msg.id}')" class="${bgClass} rounded-2xl w-[220px] p-3 flex flex-col shadow-sm cursor-pointer active:scale-95 transition-all"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center ${iconColor}"><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-3.57-1.62-3.57-3.15 0-1.53 1.11-2.61 2.5-2.93V4.9h2.67v1.91c1.38.23 2.49 1.08 2.65 2.74h-1.96c-.08-.85-.66-1.54-2.02-1.54-1.25 0-2.08.63-2.08 1.47 0 .61.32 1.34 2.56 1.92 2.82.72 3.78 1.88 3.78 3.33 0 1.63-1.16 2.83-2.9 3.36z"/></svg></div><div class="flex flex-col flex-1 overflow-hidden"><span class="text-[15px] text-white font-bold truncate">¥ ${msg.amount}</span><span class="text-[11px] text-white/80 truncate">${msg.text}</span></div></div><div class="mt-3 pt-2 border-t border-white/20 text-[10px] text-white/60 font-medium">${statusText}</div></div>`;
        } else if (msg.type === 'transfer_received' || msg.type === 'transfer_refunded') {
            const isRefund = msg.type === 'transfer_refunded';
            bubbleHtml = `<div class="bg-[#F59A23]/60 rounded-2xl w-[220px] p-3 flex flex-col shadow-sm cursor-pointer active:scale-95 transition-all"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white/70"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="${isRefund ? 'M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6' : 'M5 13l4 4L19 7'}" /></svg></div><div class="flex flex-col flex-1 overflow-hidden"><span class="text-[15px] text-white font-bold truncate">${isRefund ? '已退还' : '已收款'} ¥ ${msg.amount}</span><span class="text-[11px] text-white/80 truncate">${msg.text}</span></div></div><div class="mt-3 pt-2 border-t border-white/20 text-[10px] text-white/60 font-medium">微信转账</div></div>`;
        } else if (msg.type === 'redpacket') {
            const bgClass = msg.isReceived ? 'bg-[#F45447]/60' : 'bg-[#F45447]';
            const iconColor = msg.isReceived ? 'text-[#FDE0A6]/70' : 'text-[#FDE0A6]';
            bubbleHtml = `<div onclick="!window.isMultiSelecting && window.handleCardClick('${msg.id}')" class="${bgClass} rounded-2xl w-[220px] p-3 flex flex-col shadow-sm cursor-pointer active:scale-95 transition-all"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-[#D93F34]/50 flex items-center justify-center ${iconColor}"><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.36 7H4.64C3.73 7 3 7.73 3 8.64v10.72C3 20.27 3.73 21 4.64 21h14.72c.91 0 1.64-.73 1.64-1.64V8.64C21 7.73 20.27 7 19.36 7zm-7.36 8.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zm5-9.5H7V4.5C7 3.67 7.67 3 8.5 3h7c.83 0 1.5.67 1.5 1.5V6z"/></svg></div><div class="flex flex-col flex-1 overflow-hidden"><span class="text-[14px] text-[#FDE0A6] font-bold truncate">${msg.text}</span><span class="text-[10px] text-[#FDE0A6]/80 truncate">${msg.isReceived ? '已领取' : '领取红包'}</span></div></div><div class="mt-3 pt-2 border-t border-[#FDE0A6]/20 text-[10px] text-[#FDE0A6]/60 font-medium">微信红包</div></div>`;
        } else {
            const bgClass = msg.role === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : (msg.role === 'user' ? `bg-zinc-900 text-white ${userRounding}` : `bg-white text-zinc-800 ${aiRounding} border border-zinc-100`);
            bubbleHtml = `<div class="${bgClass} px-3.5 py-2 shadow-sm"><p class="text-[14px] font-medium break-words leading-snug whitespace-pre-wrap">${msg.text}</p></div>`;
        }

        if (msg.role === 'user') return `<div class="${selectWrapClass} ${mtClass}" ${pressEvents}>${checkboxHtml}<div class="flex-1 flex justify-end gap-2 items-end"><div class="flex flex-col max-w-[75%] items-end">${bubbleHtml}${quoteHtmlUser}</div>${renderUserAvatar}</div></div>`;
        else return `<div class="${selectWrapClass} ${mtClass}" ${pressEvents}>${checkboxHtml}<div class="flex-1 flex justify-start gap-2 items-end">${renderAiAvatar}<div class="flex flex-col max-w-[75%] items-start">${bubbleHtml}${quoteHtmlAi}</div></div></div>`;
    }).join('');
    
    if(!window.isMultiSelecting) window.scrollToBottom();
};

window.scrollToBottom = function() { const container = document.getElementById('chat-messages'); container.scrollTop = container.scrollHeight; };
window.handleEnter = function(e) { if (e.key === 'Enter') window.sendMessage(); };

window.startMsgPress = function(e, msgId) {
    if(window.isMultiSelecting) return;
    isPressingMsg = false;
    msgPressTimer = setTimeout(() => {
        isPressingMsg = true; window.activeMsgId = msgId;
        if(navigator.vibrate) navigator.vibrate(50);
        document.getElementById('msg-context-modal').classList.remove('hidden');
        setTimeout(()=> document.getElementById('msg-context-card').classList.remove('translate-y-full'), 10);
    }, 500);
};
window.cancelMsgPress = function() { clearTimeout(msgPressTimer); };

window.handleMsgClick = function(id) {
    if(window.isMultiSelecting) {
        const idx = window.selectedMsgIds.indexOf(id);
        if(idx > -1) window.selectedMsgIds.splice(idx, 1); else window.selectedMsgIds.push(id);
        window.renderChatMessages();
    }
};

window.closeMsgMenu = function(e) { 
    if(e) e.stopPropagation();
    document.getElementById('msg-context-card').classList.add('translate-y-full');
    setTimeout(()=> document.getElementById('msg-context-modal').classList.add('hidden'), 300);
};

window.msgAction = function(action) {
    const msg = window.chatHistories[window.currentChatId].find(m => m.id === window.activeMsgId);
    if(!msg) return;

    if(action === 'copy') {
        if(msg.type || msg.isForwardCard) { alert("卡片类消息无法复制"); } else { navigator.clipboard.writeText(msg.text || msg.originalText); }
    } else if (action === 'quote') {
        window.pendingQuoteText = (msg.type || msg.isForwardCard) ? "[卡片消息]" : (msg.text || msg.originalText);
        document.getElementById('quote-text').innerText = window.pendingQuoteText;
        document.getElementById('quote-preview').classList.remove('hidden');
    } else if (action === 'edit') {
        if(msg.type || msg.isForwardCard || msg.isRevoked || msg.role === 'system') { alert("该消息无法编辑"); window.closeMsgMenu(); return; }
        document.getElementById('edit-msg-input').value = msg.text;
        document.getElementById('msg-edit-modal').classList.remove('hidden');
    } else if (action === 'revoke') {
        msg.isRevoked = true; msg.originalText = msg.text; msg.text = ''; msg.type = undefined; msg.isForwardCard = undefined;
        window.saveAllLingoData(); window.renderChatMessages();
    } else if (action === 'del') {
        window.chatHistories[window.currentChatId] = window.chatHistories[window.currentChatId].filter(m => m.id !== window.activeMsgId);
        window.saveAllLingoData(); window.renderChatMessages();
    } else if (action === 'select') {
        window.isMultiSelecting = true; window.selectedMsgIds = [window.activeMsgId];
        document.getElementById('chat-bottom-area').classList.add('translate-y-full', 'hidden');
        document.getElementById('multi-select-bar').classList.remove('hidden'); window.renderChatMessages();
    }
    window.closeMsgMenu();
};

window.clearQuote = function() { window.pendingQuoteText = null; document.getElementById('quote-preview').classList.add('hidden'); };
window.saveMsgEdit = function() {
    const newText = document.getElementById('edit-msg-input').value.trim();
    if(newText) {
        const msg = window.chatHistories[window.currentChatId].find(m => m.id === window.activeMsgId);
        msg.text = newText; window.saveAllLingoData(); window.renderChatMessages();
    }
    document.getElementById('msg-edit-modal').classList.add('hidden');
};

window.endMultiSelect = function() {
    window.isMultiSelecting = false; window.selectedMsgIds = [];
    document.getElementById('multi-select-bar').classList.add('hidden');
    document.getElementById('chat-bottom-area').classList.remove('translate-y-full', 'hidden');
    window.renderChatMessages();
};
window.multiAction = function(action) {
    if(window.selectedMsgIds.length === 0) return;
    if(action === 'del') { window.chatHistories[window.currentChatId] = window.chatHistories[window.currentChatId].filter(m => !window.selectedMsgIds.includes(m.id)); window.saveAllLingoData(); window.endMultiSelect(); } 
    else if (action === 'fav') { alert("已收藏"); window.endMultiSelect(); }
};

window.openForwardModal = function() {
    if(window.selectedMsgIds.length === 0) return;
    const list = document.getElementById('forward-char-list');
    list.innerHTML = window.characters.map(c => `<div onclick="window.executeForward(${c.id})" class="p-4 border border-zinc-100 rounded-2xl flex items-center gap-3 cursor-pointer active:bg-zinc-50 shadow-sm">${c.avatarUrl ? `<img src="${c.avatarUrl}" class="w-10 h-10 rounded-full object-cover"/>` : `<div class="w-10 h-10 rounded-full bg-gradient-to-tr ${c.color} flex items-center justify-center text-white font-bold">${c.name.charAt(0).toUpperCase()}</div>`}<span class="font-bold text-zinc-900">${c.name}</span></div>`).join('');
    document.getElementById('forward-modal').classList.remove('hidden');
};
window.executeForward = function(targetId) {
    const msgs = window.chatHistories[window.currentChatId].filter(m => window.selectedMsgIds.includes(m.id)).map(m => { return { roleName: m.role === 'user' ? '我' : window.characters.find(c=>c.id===window.currentChatId).name, text: m.isRevoked ? "(撤回了一条消息)" : m.text || "[卡片消息]" }; });
    const previewText = msgs.slice(0, 3).map(m => `${m.roleName}: ${m.text}`).join('<br>');
    if(!window.chatHistories[targetId]) window.chatHistories[targetId] = [];
    window.chatHistories[targetId].push({ id: window.generateId(), role: 'user', isForwardCard: true, forwardPreviewText: previewText + (msgs.length > 3 ? '<br>...' : ''), forwardData: msgs });
    window.saveAllLingoData(); document.getElementById('forward-modal').classList.add('hidden'); window.endMultiSelect(); alert("已转发！");
};

window.openForwardView = function(dataStr) {
    const msgs = JSON.parse(decodeURIComponent(dataStr));
    document.getElementById('forward-view-content').innerHTML = msgs.map(m => `<div class="flex flex-col mb-1 border-b border-zinc-100 pb-3"><span class="text-[11px] font-bold text-zinc-500 mb-1">${m.roleName}</span><span class="text-[13px] text-zinc-900">${m.text}</span></div>`).join('');
    document.getElementById('forward-view-modal').classList.remove('hidden'); setTimeout(()=> document.getElementById('forward-view-modal').classList.remove('translate-y-full'), 10);
};

window.sendMessage = function() {
    window.hideChatMenu();
    const input = document.getElementById('chat-input'); const text = input.value.trim(); if(!text) return;
    if(!window.chatHistories[window.currentChatId]) window.chatHistories[window.currentChatId] = [];
    window.chatHistories[window.currentChatId].push({ id: window.generateId(), role: 'user', text, quote: window.pendingQuoteText }); 
    input.value = ''; window.clearQuote(); window.saveAllLingoData(); window.renderChatMessages();
};

// 🌟 强化的 AI 接收系统：强制 AI 严格遵循指令
// 🌟 强化的 AI 接收系统：修复 AI 引用和动作指令被吞的问题！
window.receiveMessage = async function() {
    window.hideChatMenu();
    if(window.isReceiving || !window.currentChatId) return;
    window.isReceiving = true;
    const container = document.getElementById('chat-messages'); const typingId = 'typing-' + Date.now();
    const char = window.characters.find(c => c.id === window.currentChatId);
    if(!window.chatHistories[window.currentChatId]) window.chatHistories[window.currentChatId] = [];
    const history = window.chatHistories[window.currentChatId];

    const charAvatar = char.avatarUrl ? `<img src="${char.avatarUrl}" class="w-8 h-8 rounded-full object-cover shadow-sm" />` : `<div class="w-8 h-8 rounded-full bg-gradient-to-tr ${char.color} flex items-center justify-center text-white shadow-sm text-xs font-bold">${char.name.charAt(0).toUpperCase()}</div>`;
    const mtClass = (history.length > 0 && history[history.length - 1].role === 'ai') ? "mt-0.5" : "mt-4";
    container.insertAdjacentHTML('beforeend', `<div id="${typingId}" class="flex justify-start gap-2 w-full ${mtClass} items-end">${charAvatar}<div class="bg-white px-3.5 py-2.5 rounded-2xl rounded-bl-sm shadow-sm border border-zinc-100 flex items-center gap-1 w-14 h-[32px]"><div class="w-1.5 h-1.5 bg-zinc-400 rounded-full typing-dot"></div><div class="w-1.5 h-1.5 bg-zinc-400 rounded-full typing-dot"></div><div class="w-1.5 h-1.5 bg-zinc-400 rounded-full typing-dot"></div></div></div>`);
    window.scrollToBottom();
    
    let apiUrl = window.safeGet('global_api_url') || "https://api.openai.com"; apiUrl = apiUrl.replace(/\/+$/, '');
    const apiKey = window.safeGet('global_api_key'); const apiModel = window.safeGet('global_api_model') || "gpt-3.5-turbo";
    if (!apiKey) { setTimeout(() => { document.getElementById(typingId)?.remove(); window.chatHistories[window.currentChatId].push({ id: window.generateId(), role: 'error', text: "系统提示：请先配置 Secret Key。" }); window.saveAllLingoData(); window.renderChatMessages(); window.isReceiving = false; }, 800); return; }

    // 💡 修改点1：更强硬的系统提示词
    const systemPrompt = `你现在的身份是：${char.name}。你的性别是：${char.gender || '保密'}，年龄是：${char.age || '保密'}。
设定：${char.prompt}
规则：
1. 绝对不暴露AI身份，绝对口语化，不要心理描写。多句话必须用换行符(\\n)隔开！
2. 【撤回】：若要撤回第一句话重发，在最开头写 <REVOKE>
3. 【引用】：想引用对方的话，必须在回复的开头单独写一行 <QUOTE:要引用的内容>
4. 【金钱互动】：收下转账回复 <RECEIVE>；拒收退还回复 <REFUND>；领取红包回复 <RECEIVE_REDPACKET>。主动发转账/红包单独写一行 <TRANSFER:金额:备注> 或 <REDPACKET:金额:备注>。`;

    const messagesPayload = [{ role: "system", content: systemPrompt }];
    history.slice(-15).forEach(msg => { 
        if(!msg.isRevoked && !msg.isForwardCard && (msg.role === 'user' || msg.role === 'ai')) {
            let txt = msg.text || '';
            if(msg.type === 'transfer') txt = `[发出转账: ${msg.amount}元, 备注: ${msg.text}]`;
            if(msg.type === 'transfer_received') txt = `[已收款]`;
            if(msg.type === 'transfer_refunded') txt = `[已退还]`;
            if(msg.type === 'redpacket') txt = `[发出红包, 备注: ${msg.text}]`;
            if(txt.trim().length > 0) messagesPayload.push({ role: msg.role === 'user' ? 'user' : 'assistant', content: txt });
        } 
    });

    try {
        const response = await fetch(`${apiUrl}/v1/chat/completions`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` }, body: JSON.stringify({ model: apiModel, messages: messagesPayload, temperature: 0.85 }) });
        document.getElementById(typingId)?.remove();
        if (!response.ok) {
            const errData = await response.json().catch(()=>({}));
            throw new Error(errData.error?.message || `网络请求失败 (${response.status})`);
        }
        
        const data = await response.json(); let aiReply = data.choices[0].message.content || '';
        aiReply = aiReply.replace(/\*.*?\*/g, '').replace(/（.*?）/g, '');
        
        // 💡 修改点2：提前拦截所有行为指令标签，防止因为换行被当成空内容抛弃！
        let isRevokedByAI = false; 
        if(aiReply.includes('<REVOKE>')) { isRevokedByAI = true; aiReply = aiReply.replace(/<REVOKE>/g, '').trim(); }

        let globalQuoteText = null;
        const quoteMatch = aiReply.match(/<QUOTE:\s*(.*?)\s*>/);
        if(quoteMatch) {
            globalQuoteText = quoteMatch[1].trim();
            aiReply = aiReply.replace(quoteMatch[0], '').trim();
        }

        const replies = aiReply.split('\n').map(s => s.trim()).filter(s => s.length > 0);
        for (let i = 0; i < replies.length; i++) {
            let textStr = replies[i];

            if(textStr.includes('<RECEIVE>')) {
                const lastTransfer = history.slice().reverse().find(m => m.type === 'transfer' && m.role === 'user' && !m.isReceived && !m.isRefunded);
                if(lastTransfer) { lastTransfer.isReceived = true; window.chatHistories[window.currentChatId].push({ id: window.generateId(), role: 'ai', type: 'transfer_received', amount: lastTransfer.amount, text: "已收款" }); }
                textStr = textStr.replace(/<RECEIVE>/g, '').trim();
            }
            if(textStr.includes('<REFUND>')) {
                const lastTransfer = history.slice().reverse().find(m => m.type === 'transfer' && m.role === 'user' && !m.isReceived && !m.isRefunded);
                if(lastTransfer) { lastTransfer.isRefunded = true; window.chatHistories[window.currentChatId].push({ id: window.generateId(), role: 'ai', type: 'transfer_refunded', amount: lastTransfer.amount, text: "已退还" }); }
                textStr = textStr.replace(/<REFUND>/g, '').trim();
            }
            if(textStr.includes('<RECEIVE_REDPACKET>')) {
                const lastRp = history.slice().reverse().find(m => m.type === 'redpacket' && m.role === 'user' && !m.isReceived);
                if(lastRp) { lastRp.isReceived = true; window.chatHistories[window.currentChatId].push({ id: window.generateId(), role: 'system', text: `${char.name} 领取了你的红包` }); }
                textStr = textStr.replace(/<RECEIVE_REDPACKET>/g, '').trim();
            }

            if(!textStr) continue;

            // 把引用内容只附加在第一句话下面，后面的话就不挂引用了
            let currentQuote = globalQuoteText;
            globalQuoteText = null; 

            let msgObj = { id: window.generateId(), role: 'ai', text: textStr, isRevoked: (isRevokedByAI && i === 0), originalText: textStr, quote: currentQuote };
            
            const transferMatch = textStr.match(/<TRANSFER:\s*([\d.]+)\s*:\s*(.*?)\s*>/);
            if(transferMatch) { msgObj.type = 'transfer'; msgObj.amount = transferMatch[1]; msgObj.text = transferMatch[2]; msgObj.isReceived = false; msgObj.originalText = "[转账卡片]"; }
            
            const rpMatch = textStr.match(/<REDPACKET:\s*([\d.]+)\s*:\s*(.*?)\s*>/);
            if(rpMatch) { msgObj.type = 'redpacket'; msgObj.amount = rpMatch[1]; msgObj.text = rpMatch[2]; msgObj.isReceived = false; msgObj.originalText = "[红包卡片]"; }

            window.chatHistories[window.currentChatId].push(msgObj);
            window.saveAllLingoData(); window.renderChatMessages();
        }
    } catch (error) {
        document.getElementById(typingId)?.remove();
        window.chatHistories[window.currentChatId].push({ id: window.generateId(), role: 'error', text: `调用失败：${error.message}` }); window.saveAllLingoData(); window.renderChatMessages();
    } finally { window.isReceiving = false; }
};
