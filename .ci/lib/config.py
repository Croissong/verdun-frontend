import coloredlogs
import logging
from os import path, getcwd
from ruamel.yaml import YAML

VERDUN_REPO_PATH = path.join(getcwd(), '../verdun')

yaml = YAML(typ='safe')
yaml.default_flow_style = False
logger = logging.getLogger('circleci')

def init():
    coloredlogs.install(level='DEBUG')
