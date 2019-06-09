import click
from os import path
from lib.util import is_dev, is_local, login_docker, get_git_hash, get_repo, clone_repo, docker_build
from lib.config import init, yaml, VERDUN_REPO_PATH, docker_client

init()

@click.group()
@click.option('--local/--ci', default=False)
@click.option('--dev/--prod', default=False)
@click.pass_context
def ci(ctx, local, dev):
    ctx.ensure_object(dict)
    ctx.obj['local'] = local
    ctx.obj['dev'] = dev

@ci.command()
@click.pass_context
def tag_image(ctx):
    repo = get_repo()
    tag = get_git_hash(repo)
    if is_local():
        image = f'croissong/verdun-frontend:{tag}'
        build_push_container(image)
    else:
        with open('.tags', 'w') as f:
            f.write(tag)

@ci.command()
@click.pass_context
def update_deployment(ctx):
    repo = get_repo()
    tag = get_git_hash(repo)
    verdun_repo = clone_repo(VERDUN_REPO_PATH, write=True)
    images_file = path.join(VERDUN_REPO_PATH, 'k8s/values/images.yml')
    with open(images_file, 'r+', encoding='utf-8') as f:
        images = yaml.load(f)
        images['verdun']['frontend']['tag'] = tag
        f.seek(0)
        f.truncate()
        yaml.dump(images, f)
    git_push(verdun_repo, tag)

def git_push(repo, tag):
    repo.git.add('k8s')
    if not is_dev():
        repo.git.commit('-m', f'Bump verdun-frontend -> {tag}')
        repo.git.push('origin', 'master')

def build_push_container(image):
    if not is_local():
        login_docker()
    docker_build(tag=image, path='.')
    if not is_dev():
        docker_client.images.push(image)


if __name__ == '__main__':
    ci()
