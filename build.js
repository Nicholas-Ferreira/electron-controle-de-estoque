require('electron-packager')({
	asar: { },
	tmpdir: require('os').tmpdir(),
	dir: './',
	overwrite: true,
	out: './dist',
});