import 'zone.js/node';

import { APP_BASE_HREF } from '@angular/common';
import express from 'express';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import bootstrap from './main.server';

// O Express app
const app = express();
const PORT = process.env['PORT'] || 4001;

// Pasta raiz dos arquivos
const distFolder = join(process.cwd(), 'dist/atv03/browser');
const indexHtml = existsSync(join(distFolder, 'index.original.html'))
  ? 'index.original.html'
  : 'index.html';

// Servir arquivos estáticos do diretório /browser
app.get('*.*', express.static(distFolder, {
  maxAge: '1y'
}));

// API Rest ou outras rotas podem ser definidas aqui

// Todas as outras requisições vão para o Angular
app.get('*', (req, res) => {
  // Esta parte pode ser atualizada depois, após o primeiro build
  res.sendFile(join(distFolder, indexHtml));
});

// Iniciar o servidor Express
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
}); 