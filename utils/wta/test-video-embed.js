function makeYoutubeEmbed(videoUrl) {
  if (typeof videoUrl !== 'string') {
    return undefined;
  }

  const getId = url => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length == 11) {
      return match[2];
    }
  };

  const id = getId(videoUrl);

  if (id) {
    return 'https://www.youtube.com/embed/' + id;
  }
}

const res = makeYoutubeEmbed(`https://www.youtube.com/watch?v=IGRWISgLgn8`);

const html = `<iframe width="600" height="380" src="${res}" frameborder="0"></iframe>`;
console.log(html);
