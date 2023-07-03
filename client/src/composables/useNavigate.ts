import { router }  from "../router";

export const useNavigate = (route: string) => {
	return router.push({name: route});
};
