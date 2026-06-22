import { Router } from 'express';
import { unitController } from '../controllers/unitController';
import { brandController } from '../controllers/brandController';
import { warrantyController } from '../controllers/warrantyController';
import { variationController } from '../controllers/variationController';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();
router.use(requireAuth);

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

export const productsSettingsRouter = router;
