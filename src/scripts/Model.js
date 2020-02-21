export default class Model {
	static validateModel(model) {
		if (model === undefined) {
			return {
				message: 'Пустые значения модели возможны',
				valid: true,
			};
		}
		if (!Array.isArray(model)) {
			return {
				valid: false,
				message: 'JSON должен быть массивом',
			};
		}
		for (let field_rule of model) {
			if (!('entity' in field_rule) || !('field' in field_rule) || !('field_name' in field_rule)) {
				return {
					valid: false,
					message: 'Каждый объект в JSON массиве должен содержать ключи entity, field, field_name.',
				};
			}
		}
		return {
			message: 'Модель правильная',
			valid: true,
		};
	}
}
