function updateClickableAreas() {
    const img = document.getElementById('responsive-image');
    const imgRect = img.getBoundingClientRect();

    const nextArea = document.getElementById('nextArea');
    const nextAreaSize = Math.min(imgRect.width, imgRect.height) * 0.087;
    nextArea.style.width = `${nextAreaSize}px`;
    nextArea.style.height = `${nextAreaSize}px`;
    nextArea.style.top = `${imgRect.top + imgRect.height * 0.517}px`;
    nextArea.style.left = `${imgRect.left + imgRect.width * 0.922}px`;

    const rArea = document.getElementById('rArea');
    rArea.style.top = `${imgRect.top + imgRect.height * 0.2759}px`;
    rArea.style.left = `${imgRect.left + imgRect.width * 0.0989}px`;
    rArea.style.width = `${imgRect.width * 0.25}px`;
    rArea.style.height = `${imgRect.height * 0.625}px`;

    const tArea = document.getElementById('tArea');
    tArea.style.top = `${imgRect.top + imgRect.height * 0.2759}px`;
    tArea.style.left = `${imgRect.left + imgRect.width * 0.3739}px`;
    tArea.style.width = `${imgRect.width * 0.25}px`;
    tArea.style.height = `${imgRect.height * 0.625}px`;

    const cArea = document.getElementById('cArea');
    cArea.style.top = `${imgRect.top + imgRect.height * 0.2759}px`;
    cArea.style.left = `${imgRect.left + imgRect.width * 0.6489}px`;
    cArea.style.width = `${imgRect.width * 0.25}px`;
    cArea.style.height = `${imgRect.height * 0.625}px`;
}

function getCountsFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        rArea: parseInt(urlParams.get('rArea')) || 0,
		tArea: parseInt(urlParams.get('tArea')) || 0,
        cArea: parseInt(urlParams.get('cArea')) || 0
    };
}

function selectArea(area) {
    document.querySelectorAll('.clickable-area').forEach(function(el) {
        el.classList.remove('selected');
    });

    area.classList.add('selected');
    window.selectedArea = area.id;
}

function updateCountsAndNavigate() {
    const counts = getCountsFromURL();

    if (window.selectedArea) {
        counts[window.selectedArea]++;
    }

    const nextArea = document.getElementById('nextArea');
    const baseUrl = nextArea.href.split('?')[0]; // Conserver la partie de base de l'URL
    const url = new URL(baseUrl);
    url.searchParams.set('rArea', counts.rArea);
	url.searchParams.set('tArea', counts.tArea);
    url.searchParams.set('cArea', counts.cArea);
    

    nextArea.href = url.toString();
}

function applyResultStyleToMaxCounts(counts) {

	
	const maxCount = Math.max(counts.rArea, counts.cArea, counts.tArea);

	if (counts.rArea === maxCount) {
		document.getElementById('rArea').classList.add('top-result-area');
	} else {
		document.getElementById('rArea').classList.add('result-area');
		document.getElementById('rArea').classList.remove('clickable-area');
	}
	if (counts.cArea === maxCount) {
		document.getElementById('cArea').classList.add('top-result-area');
	} else {
		document.getElementById('cArea').classList.add('result-area');
		document.getElementById('cArea').classList.remove('clickable-area');
	}
	if (counts.tArea === maxCount) {
		document.getElementById('tArea').classList.add('top-result-area');
	} else {
		document.getElementById('tArea').classList.add('result-area');
		document.getElementById('tArea').classList.remove('clickable-area');
	}
}

document.addEventListener('DOMContentLoaded', function() {
	
	window.addEventListener('resize', updateClickableAreas);
    window.addEventListener('load', updateClickableAreas);
	
	if (document.title === "Fast Fashion - Résultats") {
        const counts = getCountsFromURL();
        applyResultStyleToMaxCounts(counts);
		return;
    }
	
    document.getElementById('rArea').addEventListener('click', function(event) {
        event.preventDefault();
        selectArea(this);
    });

    document.getElementById('tArea').addEventListener('click', function(event) {
        event.preventDefault();
        selectArea(this);
    });

    document.getElementById('cArea').addEventListener('click', function(event) {
        event.preventDefault();
        selectArea(this);
    });

    document.getElementById('nextArea').addEventListener('click', function(event) {
        event.preventDefault();
        updateCountsAndNavigate();
        window.location.href = this.href;
    });


	

});
