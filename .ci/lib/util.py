import click
import shlex
from base64 import b64decode
from git import Repo
from os import environ, getcwd
from subprocess import run, CalledProcessError, STDOUT
from lib.config import logger

def is_local() -> bool:
    return click.get_current_context().params['local']

def is_dev() -> bool:
    return click.get_current_context().params['dev']

def run_cmd(cmd, check=True, input=None, cwd=None):
    try:
        p = run(shlex.split(cmd), stderr=STDOUT, check=check, input=input, universal_newlines=True, cwd=cwd)
        return p.stdout
    except CalledProcessError as e:
        print(e.output)
        raise e

def get_git_hash(repo):
    return repo.git.rev_parse(f'HEAD', short=8)

def get_repo(path=getcwd(), write=False):
    repo = Repo(path)
    if write and not is_local():
        init_git_conf(repo)
    return repo

def clone_repo(path, write):
    if not is_local():
        add_ssh_key()
        repo = Repo.clone_from('git@github.com:Croissong/verdun.git', path)
        if write:
            init_git_conf(repo)
    else:
        return Repo(path)
    return repo

def add_ssh_key():
    deploy_key = b64decode(environ['DEPLOY_KEY_B64'])
    with open('~/.ssh/id_rsa', 'bw') as f:
        f.write(deploy_key)

def init_git_conf(repo):
    conf = repo.config_writer()
    conf.set_value('user', 'name', 'Verdun CI Bot').release()
    conf.set_value('user', 'email', 'verdun-ci-bot@patrician.gold').release()

def login_docker():
    docker_user = environ['DOCKER_USER']
    docker_password = environ['DOCKER_PASSWORD']
    run_cmd(f'docker login --username={docker_user} --password-stdin', input=docker_password)

def build_push_container(directory, image):
    if not is_local():
        login_docker()
    if is_dev():
        logger.info(f'Skipping building image {image}')
    else:
        run_cmd(f'docker build -t {image} {directory}')
        run_cmd(f'docker push {image}')
