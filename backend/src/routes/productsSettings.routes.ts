import { Router } from 'express';
import { unitController } from '../controllers/unitController';
import { brandController } from '../controllers/brandController';
import { warrantyController } from '../controllers/warrantyController';
import { variationController } from '../controllers/variationController';
import { categoryController } from '../controllers/categoryController';
import { departmentController } from '../controllers/departmentController';
import { modifierController } from '../controllers/modifierController';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();
router.use(requireAuth);

// Categories
router.get('/categories', categoryController.getCategories);
router.post('/categories', categoryController.createCategory);
router.put('/categories/:id', categoryController.updateCategory);
router.delete('/categories/:id', categoryController.deleteCategory);

// Departments
router.get('/departments', departmentController.getDepartments);
router.post('/departments', departmentController.createDepartment);
router.put('/departments/:id', departmentController.updateDepartment);
router.delete('/departments/:id', departmentController.deleteDepartment);

// Units
router.get('/units', unitController.getUnits);
router.post('/units', unitController.createUnit);
router.put('/units/:id', unitController.updateUnit);
router.delete('/units/:id', unitController.deleteUnit);

// Brands
router.get('/brands', brandController.getBrands);
router.post('/brands', brandController.createBrand);
router.put('/brands/:id', brandController.updateBrand);
router.delete('/brands/:id', brandController.deleteBrand);

// Warranties
router.get('/warranties', warrantyController.getWarranties);
router.post('/warranties', warrantyController.createWarranty);
router.put('/warranties/:id', warrantyController.updateWarranty);
router.delete('/warranties/:id', warrantyController.deleteWarranty);

// Variations
router.get('/variations', variationController.getVariations);
router.post('/variations', variationController.createVariation);
router.put('/variations/:id', variationController.updateVariation);
router.delete('/variations/:id', variationController.deleteVariation);

router.get('/modifiers', modifierController.getModifierGroups);
router.post('/modifiers', modifierController.createModifierGroup);
router.put('/modifiers/:id', modifierController.updateModifierGroup);
router.delete('/modifiers/:id', modifierController.deleteModifierGroup);

export const productsSettingsRouter = router;
