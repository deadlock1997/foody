import ViewRecipe from "@/components/ViewRecipe/ViewRecipe";
import { getServerUrl } from "@/utils/common.functions";

export default async function Page({
  params,
}: {
  params: { recipeId: string; imageId: string };
}) {
  console.log(params);
  const recipeResponse = await fetch(
    `${getServerUrl()}/api/recipes/${params.recipeId}`
  );
  const recipe = await recipeResponse.json();
  return <ViewRecipe recipe={recipe} />;
}
