using System.Web.Mvc;

namespace GamePortal.WebSite.Controllers
{
    public class GamesController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult TicTacToe()
        {
            return View();
        }
    }
}