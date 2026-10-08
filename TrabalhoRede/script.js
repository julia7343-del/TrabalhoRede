document.addEventListener('DOMContentLoaded', () => {
  // Navigation Tabs Switching
  const navButtons = document.querySelectorAll('.nav-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      navButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(targetTab).classList.add('active');
    });
  });

  // Copy README Button
  const copyBtn = document.getElementById('copy-readme');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const textarea = document.getElementById('readme-text');
      textarea.select();
      navigator.clipboard.writeText(textarea.value);
      copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copiado!';
      setTimeout(() => {
        copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Copiar Código';
      }, 2000);
    });
  }

  // Interactive CLI Terminal Simulation
  const cliInput = document.getElementById('cli-input');
  const terminalBody = document.getElementById('terminal-body');
  const scenarioSelect = document.getElementById('scenario-select');

  if (cliInput) {
    cliInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = cliInput.value.trim().toLowerCase();
        const scenario = scenarioSelect.value;
        cliInput.value = '';

        if (!cmd) return;

        appendTermLine(`C:\\Users\\Aluno> ${cmd}`, 'text-main');

        if (cmd === 'clear' || cmd === 'cls') {
          terminalBody.innerHTML = '';
          return;
        }

        if (cmd === 'help') {
          appendTermLine('Comandos disponíveis: ipconfig, ping <ip>, nslookup <host>, tracert <host>, arp -a, clear');
          return;
        }

        processCommand(cmd, scenario);
      }
    });
  }

  function appendTermLine(text, colorClass = '') {
    const line = document.createElement('div');
    line.className = `term-line ${colorClass}`;
    line.textContent = text;
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function processCommand(cmd, scenario) {
    if (cmd.startsWith('ipconfig')) {
      handleIpconfig(scenario);
    } else if (cmd.startsWith('ping')) {
      handlePing(cmd, scenario);
    } else if (cmd.startsWith('nslookup')) {
      handleNslookup(cmd, scenario);
    } else if (cmd.startsWith('arp')) {
      handleArp(scenario);
    } else if (cmd.startsWith('tracert')) {
      handleTracert(cmd, scenario);
    } else {
      appendTermLine(`'${cmd}' não é reconhecido como um comando interno. Digite 'help'.`, 'text-red');
    }
  }

  function handleIpconfig(scenario) {
    if (scenario === 'cabo') {
      appendTermLine('Adaptador de Rede Ethernet:');
      appendTermLine('   Estado da mídia . . . . . . . . . . . : Mídia desconectada', 'text-red');
      appendTermLine('   Endereço MAC. . . . . . . . . . . . . : 00-1A-2B-3C-4D-5E');
    } else if (scenario === 'ip-incorreto') {
      appendTermLine('Adaptador de Rede Ethernet:');
      appendTermLine('   Endereço IPv4. . . . . . . . . . . . : 10.0.0.88', 'text-yellow');
      appendTermLine('   Máscara de Sub-rede . . . . . . . . . : 255.255.255.0');
      appendTermLine('   Gateway Padrão. . . . . . . . . . . . : 192.168.1.1 (Inacessível)');
    } else if (scenario === 'conflito') {
      appendTermLine('Adaptador de Rede Ethernet:');
      appendTermLine('   Endereço IPv4. . . . . . . . . . . . : 192.168.1.50 (Conflito Detectado)', 'text-red');
      appendTermLine('   Máscara de Sub-rede . . . . . . . . . : 255.255.255.0');
      appendTermLine('   Gateway Padrão. . . . . . . . . . . . : 192.168.1.1');
    } else if (scenario === 'internet') {
      appendTermLine('Adaptador de Rede Ethernet:');
      appendTermLine('   Endereço IPv4. . . . . . . . . . . . : 192.168.1.105');
      appendTermLine('   Máscara de Sub-rede . . . . . . . . . : 255.255.255.0');
      appendTermLine('   Gateway Padrão. . . . . . . . . . . . : 0.0.0.0 (Ausente)', 'text-red');
    } else {
      appendTermLine('Adaptador de Rede Ethernet:');
      appendTermLine('   Endereço IPv4. . . . . . . . . . . . : 192.168.1.105');
      appendTermLine('   Máscara de Sub-rede . . . . . . . . . : 255.255.255.0');
      appendTermLine('   Gateway Padrão. . . . . . . . . . . . : 192.168.1.1');
      appendTermLine('   Servidor DNS. . . . . . . . . . . . . : 8.8.8.8');
    }
  }

  function handlePing(cmd, scenario) {
    if (scenario === 'cabo') {
      appendTermLine('Aviso: A interface de rede está desconectada.', 'text-red');
      appendTermLine('Esgotado o tempo limite do pedido.');
    } else if (scenario === 'ip-incorreto') {
      appendTermLine('Disparando contra o destino com 32 bytes de dados:');
      appendTermLine('Resposta de 10.0.0.88: Host de destino inacessível.', 'text-yellow');
    } else if (scenario === 'dns' && !cmd.includes('8.8.8.8') && !cmd.includes('1.1.1.1')) {
      appendTermLine('A solicitação ping não pôde encontrar o host. Verifique o nome e tente novamente.', 'text-red');
    } else {
      appendTermLine('Disparando contra o destino com 32 bytes de dados:');
      appendTermLine('Resposta de destino: bytes=32 tempo=12ms TTL=118');
      appendTermLine('Resposta de destino: bytes=32 tempo=11ms TTL=118');
      appendTermLine('Estatísticas do Ping: Enviados = 2, Recebidos = 2, Perda = 0%');
    }
  }

  function handleNslookup(cmd, scenario) {
    if (scenario === 'dns') {
      appendTermLine('Servidor: UnKnown');
      appendTermLine('Address: 192.168.1.254');
      appendTermLine('*** UnKnown não conseguiu encontrar o domínio: Server failure.', 'text-red');
    } else {
      appendTermLine('Servidor: dns.google');
      appendTermLine('Address: 8.8.8.8');
      appendTermLine('Nome: google.com');
      appendTermLine('Addresses: 142.250.190.46');
    }
  }

  function handleArp(scenario) {
    appendTermLine('Interface: 192.168.1.105 --- 0x3');
    appendTermLine('  Endereço IP         Endereço Físico       Tipo');
    if (scenario === 'conflito') {
      appendTermLine('  192.168.1.50        00-1a-2b-3c-4d-5e     Dinâmico');
      appendTermLine('  192.168.1.50        aa-bb-cc-dd-ee-ff     DUPLICADO DETECTADO', 'text-red');
    } else {
      appendTermLine('  192.168.1.1         ec-08-6b-12-34-56     Dinâmico');
      appendTermLine('  192.168.1.255       ff-ff-ff-ff-ff-ff     Estático');
    }
  }

  function handleTracert(cmd, scenario) {
    if (scenario === 'internet' || scenario === 'cabo') {
      appendTermLine('Rastreando a rota para o destino...');
      appendTermLine('  1     *        *        *     Esgotado o tempo limite do pedido.', 'text-red');
    } else {
      appendTermLine('Rastreando a rota para 8.8.8.8 com no máximo 30 saltos:');
      appendTermLine('  1     1 ms     1 ms     1 ms  192.168.1.1');
      appendTermLine('  2    10 ms    12 ms    11 ms  10.20.0.1');
      appendTermLine('  3    15 ms    14 ms    15 ms  8.8.8.8');
      appendTermLine('Rastreamento concluído.');
    }
  }
});
