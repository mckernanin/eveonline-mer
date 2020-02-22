const Papa = require('papaparse');
const fs = require('fs').promises;

async function csvToJson(dataDirectory) {
  const regionStats = await fs.readFile(`${__dirname}/${dataDirectory}/raw/RegionalStats.csv`);
  const parsed = Papa.parse(regionStats.toString(), {
    header: true
  });
  const processed = parsed.data.filter(region => region.regionName !== '').map(region => ({
    name: region.regionName,
    exports: parseFloat(region.exports),
    exportsm3: parseFloat(region.exportsm3),
    imports: parseFloat(region.imports),
    importsm3: parseFloat(region.importsm3),
    mining: parseFloat(region['mining.value']),
    netExports: parseFloat(region['net.exports']),
    netImports: parseFloat(region['net.imports']),
    bounties: parseFloat(region['npc.bounties']),
    destroyed: parseFloat(region['total.destroyed']),
    production: parseFloat(region['total.production']),
    trade: parseFloat(region['trade.value']),

  }))
  await fs.writeFile(`${__dirname}/${dataDirectory}/regionalStats.json`, JSON.stringify(processed))
}

csvToJson('2020-01');
