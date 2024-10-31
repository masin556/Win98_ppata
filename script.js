function startBootSequence() {
    const audio = document.getElementById('bootSound');
    
    // Play the sound on user interaction
    audio.play().then(() => {
        console.log('Boot sound started.');
    }).catch(error => {
        console.log('Error playing boot sound:', error);
    });

    // Add fade-out effect after a short delay
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('fade-out');
        
        // Transition to the next screen after fade-out completes
        setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none';
            // Show the "kernel" screen or next content here
        }, 1000); // Adjust based on fade-out duration
    }, 2000); // Adjust delay based on sound length
}

// Toggle Start Menu with sound effect
function toggleStartMenu() {
    const startMenu = document.getElementById('startMenu');
    const clickSound = new Audio('click-sound.mp3'); // Add a .mp3 file for the click sound in your directory
    clickSound.play();
    startMenu.classList.toggle('hidden');
}
  
function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const timeString = `${hours}:${minutes}`;
  document.getElementById('timeDisplay').textContent = timeString;
}

// Update time every minute
setInterval(updateTime, 1000);
updateTime(); // Initial call


// Function to open a window when an icon is clicked
function openWindow(windowType) {
    const popupWindow = document.getElementById('popupWindow');
    const windowContent = document.getElementById('windowContent');
    const windowTitle = document.getElementById('windowTitle');
  
    switch (windowType) {
      case 'recycle-bin':
        windowTitle.textContent = "Recycle Bin";
        windowContent.innerHTML = "<p>Recycle Bin Contents</p>";
        break;
      case 'my-computer':
        windowTitle.textContent = "My Computer";
        windowContent.innerHTML = "<p>My Computer Contents</p>";
        break;
      case 'my-folders':
        windowTitle.textContent = "My Folders";
        windowContent.innerHTML = `
          <div class="file" onclick="openNotepad()">📄 my_note.txt</div>
        `;
        break;
    }
  
    popupWindow.classList.remove('hidden');
    popupWindow.style.top = '50%';
    popupWindow.style.left = '50%';
    popupWindow.style.transform = 'translate(-50%, -50%)';
}

// Open notepad with editable content
function openNotepad() {
    const notepad = document.createElement('div');
    notepad.classList.add('window');
    notepad.style.top = '60%';
    notepad.style.left = '60%';
    notepad.style.transform = 'translate(-50%, -50%)';
    
    notepad.innerHTML = `
      <div class="window-title">
        <span>my_note.txt - Notepad</span>
        <button onclick="this.parentNode.parentNode.remove()">X</button>
      </div>
      <textarea class="notepad-content" placeholder="Write something here..."></textarea>
    `;
  
    document.body.appendChild(notepad);
}
  
// Function to close the popup window
function closeWindow() {
document.getElementById('popupWindow').classList.add('hidden');
}
  
// Function to "End Program" (navigate to another link)
function endProgram() {
window.location.href = "http://gibeonsoftwork.notion.site"; // Replace with the actual link
}
  
const popupWindow = document.getElementById('popupWindow');
const titleBar = popupWindow.querySelector('.window-title');

titleBar.addEventListener('mousedown', (e) => {
  e.preventDefault();
  let shiftX = e.clientX - popupWindow.getBoundingClientRect().left;
  let shiftY = e.clientY - popupWindow.getBoundingClientRect().top;

  function onMouseMove(event) {
    popupWindow.style.left = event.pageX - shiftX + 'px';
    popupWindow.style.top = event.pageY - shiftY + 'px';
  }

  document.addEventListener('mousemove', onMouseMove);

  document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', onMouseMove);
  }, { once: true });
});

// Function to trigger the error modal
function triggerError() {
    const errorSound = new Audio('error-sound.mp3'); // Add your error sound file here
    errorSound.play(); // Play the error sound
  
    const errorModal = document.getElementById('errorModal');
    errorModal.classList.remove('hidden'); // Show the error modal
}
  
// Function to close the error modal
function closeError() {
    const errorModal = document.getElementById('errorModal');
    errorModal.classList.add('hidden'); // Hide the error modal
}

// Function to select an icon with a blue highlight
function selectIcon(event, iconElement) {
  event.stopPropagation();
  deselectAllIcons(); // Deselect others when a new icon is selected
  iconElement.classList.add('selected');
}

// Deselect all icons when clicking elsewhere
function deselectAllIcons() {
  document.querySelectorAll('.desktop-icon').forEach(icon => icon.classList.remove('selected'));
}


// Function to handle double-click and open explorer
function openExplorer() {
  const explorerIcon = document.querySelector('.explorer-icon');
  const explorerWindow = document.getElementById('explorerWindow');
  const explorerContent = document.getElementById('explorerContent');

  // Add pressed effect on double-click
  explorerIcon.classList.add('active');
  setTimeout(() => {
      explorerIcon.classList.remove('active');
  }, 200); // Brief delay for effect

  // Set URL for iframe (you can change this to any URL or video link)
  explorerContent.src = "https://www.youtube.com/embed/KRtgJuXz3NY"; // Replace with desired URL

  // Show the explorer window
  explorerWindow.style.display = 'block';
}

// Function to close the explorer window
function closeExplorer() {
  const explorerWindow = document.getElementById('explorerWindow');
  const explorerContent = document.getElementById('explorerContent');

  // Hide the explorer window
  explorerWindow.style.display = 'none';
  explorerContent.src = ""; // Clear the iframe source
}

// Save post in My Folders
function savePost() {
  const postContent = document.getElementById("myFolderPost").value;
  alert("Post saved: " + postContent); // Replace with your save logic
}

// Set up drag and drop for Recycle Bin
document.getElementById("recycleBinModal").addEventListener("drop", handleDrop);
document.getElementById("recycleBinModal").addEventListener("dragover", (event) => {
    event.preventDefault();
});

// Example: dragging posts
function handleDrop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");
  alert("File moved to Recycle Bin: " + data); // Handle deletion or moving to Recycle Bin
}