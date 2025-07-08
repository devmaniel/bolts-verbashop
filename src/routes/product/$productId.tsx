import { createFileRoute, useNavigate } from '@tanstack/react-router';
import ProductDetailPage from '../../components/ProductDetailPage';

export const Route = createFileRoute('/product/$productId')({
  component: ProductComponent,
});

function ProductComponent() {
  const { productId } = Route.useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate({ to: '/', replace: true });
  };

  return (
    <ProductDetailPage
      productId={parseInt(productId)}
      onBack={handleBack}
    />
  );
}