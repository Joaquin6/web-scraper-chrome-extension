import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import Config from '../scripts/Config';

$(function() {
	// popups for Storage setting input fields
	$('#sitemapDb')
		.popover({
			title: 'База данных для карт обхода',
			html: true,
			content: 'Url адрес базы CouchDB <br /> http://example.com/scraper-sitemaps/',
			placement: 'bottom',
		})
		.blur(function() {
			$(this).popover('hide');
		});

	$('#dataDb')
		.popover({
			title: 'База данных для собранных данных',
			html: true,
			content: 'Url адрес базы CouchDB. Для каждой карты обхода будет создана новая база данных.<br />http://example.com/',
			placement: 'bottom',
		})
		.blur(function() {
			$(this).popover('hide');
		});

	$('#restUrl')
		.popover({
			html: true,
			content: 'Url адрес внешнего хранилища для карт обхода.',
			placement: 'bottom',
		})
		.blur(function() {
			$(this).popover('hide');
		});

	// switch between configuration types
	$('select[name=storageType]').change(function() {
		var type = $(this).val();

		if (type === 'couchdb') {
			$('.form-group.couchdb').show();
			$('.form-group.rest').hide();
		} else if (type === 'rest') {
			$('.form-group.rest').show();
			$('.form-group.couchdb').hide();
		} else {
			$('.form-group.rest').hide();
			$('.form-group.couchdb').hide();
		}
	});

	// Extension configuration
	var config = new Config();

	// load previously synced data
	config.loadConfiguration().then(() => {
		$('#storageType').val(config.storageType);
		$('#sitemapDb').val(config.sitemapDb);
		$('#dataDb').val(config.dataDb);
		$('#restUrl').val(config.restUrl);

		$('select[name=storageType]').change();
	});

	// Sync storage settings
	$('form#storage_configuration').submit(function() {
		const storageType = $('#storageType').val();
		const newConfig = {
			storageType: storageType,
			sitemapDb: '',
			dataDb: '',
			restUrl: '',
		};

		if (storageType === 'couchdb') {
			newConfig.sitemapDb = $('#sitemapDb').val();
			newConfig.dataDb = $('#dataDb').val();
		} else if (storageType === 'rest') {
			newConfig.restUrl = $('#restUrl').val();
		}

		config
			.updateConfiguration(newConfig)
			.then(() => {
				$('.alert')
					.attr('id', 'success')
					.text('Опции успешно сохранены.')
					.show();
			})
			.catch(() => {
				$('.alert')
					.attr('id', 'error')
					.text('Ошибка при сохранении опций ' + browser.runtime.lastError.message)
					.show();
			});
		return false;
	});
});
