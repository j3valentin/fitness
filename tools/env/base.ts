import { argv } from 'yargs';
import { EnvConfig } from './env-config.interface';

const BaseConfig: EnvConfig = {
  API: argv['api']
};

export = BaseConfig;
