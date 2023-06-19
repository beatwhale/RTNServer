const ApiError = require('../error/ApiError');
const { Company, CategObjTS } = require('../models/models')
const { Sequelize } = require('sequelize')

class CompanyController {
    async searchCompanies(req, res, next) {
        try {
            const { name, tax_id, government_registration_number } = req.body;

            // Формируем условия поиска на основе переданных параметров
            const conditions = {};
            if (name) {
                conditions.name = name;
            }
            if (tax_id) {
                conditions.tax_id = tax_id;
            }
            if (government_registration_number) {
                conditions.government_registration_number = government_registration_number;
            }

            // Выполняем поиск записей в таблице "companies" по условиям
            const companies = await Company.findAll({ where: conditions });

            // Если не найдено ни одной записи, возвращаем сообщение об отсутствии результатов
            if (companies.length === 0) {
                return res.json({ message: 'По указанным параметрам не было найдено ни одной записи' });
            }

            const formattedCompanyCards = await Company.findAll({
                where: conditions,
                include: [{
                    model: CategObjTS,
                    as: 'categorized_objects_transports',
                    attributes: [],
                }, ],
                attributes: {
                    include: [
                        [
                            Sequelize.fn('COUNT', Sequelize.col('categorized_objects_transports.categorized_object_id')),
                            'registered_objects_count',
                        ],
                        [
                            Sequelize.fn('ARRAY_AGG', Sequelize.col('categorized_objects_transports.categorized_object_id')),
                            'identifiers',
                        ],
                    ],
                },
                group: ['companies.company_id'],
            });

            // Возвращаем найденные записи в форме карточек
            const companyCards = formattedCompanyCards.map((company) => {
                return {
                    company_id: company.company_id,
                    type: company.type || "Нет записи",
                    name: company.name || "Нет записи",
                    subject: company.subjectrf || "Нет записи",
                    address: company.address || "Нет записи",
                    index: company.tax_id || "Нет записи",
                    ogrn: company.government_registration_number || "Нет записи",
                    create_org_date: company.date_entry || "Нет  записи",
                    registered_objects_count: company.getDataValue('registered_objects_count'),
                    identifiers: company.getDataValue('identifiers').join(':')
                };
            });

            return res.json(companyCards), console.log("Запрос поиска компании успешно выполнен");
        } catch (error) {
            return next(console.log(error));
        }
    }

    async getObjCards(req, res, next) {
        try {
          const { company_id, identifiers } = req.body;
      
          // Разделяем идентификаторы объектов
          const identifiersArray = identifiers.split(':');
          // Выполняем поиск карточек объектов по идентификаторам
          const objectCards = await CategObjTS.findAll({
            where: {
              company_id: company_id,
              categorized_object_id: identifiersArray
            },
          });
      
          // Если не найдено ни одной карточки, возвращаем сообщение об отсутствии результатов
          if (objectCards.length === 0) {
            return res.json({ message: 'Карточки объектов не найдены' });
          }
      
          // Формируем массив карточек объектов
          const formattedObjectCards = objectCards.map((objectCard) => {
            return {
              // Необходимые поля карточки объекта
              registry_number: objectCard.registry_number || "Нет записи",
              date_entry: objectCard.date_entry || "Нет записи",
              kind_object: objectCard.kind_object || "Нет записи",
              type_object: objectCard.type_object || "Нет записи",
              name: objectCard.name || "Нет записи",
              address: objectCard.address || "Нет записи",
              subject_rf: objectCard.subjectrf || "Нет записи",
              settlement: objectCard.settlement || "Нет записи",
              index: objectCard.index || "Нет записи",
              basis_inclusion: objectCard.basis_inclusion || "Нет записи",
              date_categorization: objectCard.date_categorization || "Нет записи",
              category: objectCard.category || "Нет записи",
              basis_changes: objectCard.basis_changes || "Нет записи",
              date_changes: objectCard.date_changes || "Нет записи",
              date_changes_category: objectCard.date_changes_category || "Нет записи",
              category_changes: objectCard.category_changes || "Нет записи",
              basis_removal: objectCard.basis_removal || "Нет записи",
              date_removal: objectCard.date_removal || "Нет записи"
            };
          });
      
            console.log("Запрос поиска объектов успешно выполнен");
            console.log('company_id:', company_id);
            return res.json(formattedObjectCards);

        } catch (error) {
          return;
        }
    }
 
}


module.exports = new CompanyController()