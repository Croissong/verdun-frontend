import click
from os import path
from lib.util import is_dev, get_git_hash, get_repo, clone_repo, build_push_container
from lib.config import init, yaml, VERDUN_REPO_PATH

init()

@click.command()
@click.option('--local/--ci', default=False)
@click.option('--dev/--prod', default=False)
def ci(local, dev):
    repo = get_repo()
    tag = get_git_hash(repo)
    image = f'croissong/verdun-frontend:{tag}'
    build_push_container('frontend', image)
    verdun_repo = clone_repo(VERDUN_REPO_PATH)
    update_deployment(tag)
    git_push(verdun_repo, tag)

def update_deployment(tag):
    images_file = path.join(VERDUN_REPO_PATH, 'k8s/values/images.yml')
    with open(images_file, 'r+', encoding='utf-8') as f:
        images = yaml.load(f)
        images['verdun']['frontend']['tag'] = tag
        f.seek(0)
        f.truncate()
        yaml.dump(images, f)

def git_push(repo, tag):
    repo.git.add('k8s')
    if not is_dev():
        repo.git.commit('-m', f'Bump verdun-frontend -> {tag}')
        repo.git.push('origin', 'master')

if __name__ == '__main__':
    ci()
