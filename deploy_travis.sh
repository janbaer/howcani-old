if [[ "$TRAVIS_TAG" == "" ]]; then
  echo "We do not have a tag"
  exit 0
fi

git config --global user.name "TRAVIS-CI"
git config --global user.email "jan@janbaer.de"
git clone https://janbaer:${GH_TOKEN}@github.com/howcani-project/howcani-project.github.io.git dist
cd dist
git rm -r .
cp -r ../build/* ./
rm ./scripts/*.js.map
rm ./styles/*.css.map
git add -u && git add .
git commit -m "Version ${TRAVIS_TAG}"
git push origin master

