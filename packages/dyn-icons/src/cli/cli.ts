import { Command, Option } from 'commander';

const program = new Command();

program
  .name('dyn-icons')
  .description('Tools for generating dyn-icons cache')
  .version('0.0.0');

program
	.command("gen")
	.description("Generate output based on current configuration")
  .option("-f, --force", "Force regeneration even if output already exists")
	.addOption(
		new Option(
			"--p-limit <number>",
			"Set the parallel limit for generating icons",
		).default(1000),
  )
  .option('--verbose', 'show debug output',false)
  .action(({ pLimit, force, verbose }) => {
		console.log("gen",  pLimit, force,verbose)

		// const config = await getConfigAsync(options.configPath)
		// console.log(config)
		// const result = await gen(options, config)
		// console.log(result)
	})

program.command('clean')
  .description('Remove generated files and caches')
  .action(() => {
   	console.log("clean")
  })

program.parse();
