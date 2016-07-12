GITHUB_TOKEN=$1
VERSION=$2

if [[ "$VERSION" == "" ]]; then
  echo "We do not have a tag"
  exit 0
fi

echo "Deploying new version $VERSION"

git clone https://janbaer:${GITHUB_TOKEN}@github.com/howcani-project/howcani-project.github.io.git dist
cd dist
git rm -r .
cp -r ../build/* ./
rm ./scripts/*.js.map
rm ./styles/*.css.map
git add -u && git add .
git commit -m "Version ${VERSION}"
git push origin master

