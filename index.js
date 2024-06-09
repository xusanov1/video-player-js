const videoPlayer = document.getElementById('video-player');
const prevBtn = document.getElementById('prev-btn');
const playBtn = document.getElementById('play-btn');
const nextBtn = document.getElementById('next-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const videoList = document.getElementById('video-list');

const videos = [
  { src: 'https://www.youtube.com/watch?v=bKDdT_nyP54&list=RDRi7-vnrJD3k&index=8', title: 'Video 1' },
  { src: 'video2.mp4', title: 'Video 2' },
  { src: 'video3.mp4', title: 'Video 3' },
  { src: 'video4.mp4', title: 'Video 4' },
  { src: 'video5.mp4', title: 'Video 5' },
];

let currentIndex = 0;
let isShuffled = false;

function renderVideoList() {
  videoList.innerHTML = '';
  videos.forEach((video, index) => {
    const li = document.createElement('li');
    li.textContent = video.title;
    li.addEventListener('click', () => playVideo(index));
    videoList.appendChild(li);
  });
}

function playVideo(index) {
  currentIndex = index;
  videoPlayer.src = videos[index].src;
  videoPlayer.play();
}

function playNextVideo() {
  currentIndex = (currentIndex + 1) % videos.length;
  videoPlayer.src = videos[currentIndex].src;
  videoPlayer.play();
}

function playPreviousVideo() {
  currentIndex = (currentIndex - 1 + videos.length) % videos.length;
  videoPlayer.src = videos[currentIndex].src;
  videoPlayer.play();
}

function shuffleVideos() {
  isShuffled = !isShuffled;
  if (isShuffled) {
    videos.sort(() => Math.random() - 0.5);
    renderVideoList();
  } else {
    videos.sort((a, b) => videos.indexOf(a) - videos.indexOf(b));
    renderVideoList();
  }
  currentIndex = 0;
  videoPlayer.src = videos[currentIndex].src;
  videoPlayer.play();
}

prevBtn.addEventListener('click', playPreviousVideo);
playBtn.addEventListener('click', () => videoPlayer.paused ? videoPlayer.play() : videoPlayer.pause());
nextBtn.addEventListener('click', playNextVideo);
shuffleBtn.addEventListener('click', shuffleVideos);

renderVideoList();
playVideo(currentIndex);