import coloredlogs
import docker
import logging
from os import path, getcwd
from ruamel.yaml import YAML

VERDUN_REPO_PATH = path.join(getcwd(), '../verdun')

yaml = YAML(typ='safe')
yaml.default_flow_style = False
logger = logging.getLogger('circleci')
docker_client = docker.from_env()
docker_client_api = docker.APIClient()

def init():
    coloredlogs.install(level='DEBUG')
