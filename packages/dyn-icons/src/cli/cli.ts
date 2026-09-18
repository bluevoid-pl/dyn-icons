import { Command } from 'commander';

const program = new Command();

program
  .name('dyn-icons')
  .description('Tools for generating dyn-icons cache')
  .option('-v, --verbose', 'show debug output')
  .version('0.0.0');

program.command('gen')
  .description('Generate output based on current configuration')
  .option('-f, --force', 'Force regeneration even if output already exists')
  .option('--p-limit <number>', 'Set the parallel limit for generating icons', "1000")
  .action((str, options) => {
    console.log("gen",str, options);

 //   	const config = await getConfigAsync(options.configPath)
	// console.log(config)
	// const result = await gen(options, config)
	// console.log(result)
  });

program.command('clean')
  .description('Remove generated files and caches')
  .action((options) => {
   	console.log("clean",options)
  })
