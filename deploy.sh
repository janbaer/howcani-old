VERSION=$1

if [ -z "$VERSION" ]; then
  echo "Please pass a version as command arg"
  exit 1
fi

echo "Deploying new version $VERSION to gh-pages branch"

cd build

if [ -f "./styles/*.css.map" ]; then
  rm ./styles/*.css.map
fi

git add -u && git add .

git commit -m "Version ${VERSION}"

git push origin gh-pages

